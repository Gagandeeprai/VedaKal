import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPanchanga } from './PanchangaService';
import { Language } from '../constants/Strings';
import { ReminderRule } from '../store';

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = '@vedakal_reminder_ids';
const LOOKAHEAD_DAYS = 60;

// ─── Notification Handler ─────────────────────────────────────────────────────

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ─── AsyncStorage Helpers ─────────────────────────────────────────────────────

const loadStoredIds = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveIds = async (ids: string[]): Promise<void> => {
  try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Midnight of (today + offsetDays) in local time */
const midnightAt = (offsetDays: number): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d;
};

const slotKey = (triggerDate: Date, ruleId: string): string =>
  `${triggerDate.toDateString()}::${ruleId}`;

const buildContent = (tithi: string, daysOffset: number, language: Language) => {
  if (daysOffset === 0) return {
    title: language === 'kn' ? `ಇಂದು: ${tithi}` : language === 'sa' ? `अद्य: ${tithi}` : `Today: ${tithi}`,
    body:  language === 'kn' ? `ಇಂದು ${tithi}` : `Today is ${tithi}`,
  };
  if (daysOffset === 1) return {
    title: language === 'kn' ? `ನಾಳೆ: ${tithi}` : language === 'sa' ? `श्वः: ${tithi}` : `Tomorrow: ${tithi}`,
    body:  language === 'kn' ? `ನಾಳೆ ${tithi}` : `Tomorrow is ${tithi}`,
  };
  return {
    title: language === 'kn' ? `ಈ ವಾರ: ${tithi}` : language === 'sa' ? `सप्ताहे: ${tithi}` : `This week: ${tithi}`,
    body:  language === 'kn' ? `${tithi} ಈ ವಾರ` : `${tithi} is in 7 days`,
  };
};

// ─── Build all slots to schedule ─────────────────────────────────────────────

interface NotifSlot {
  rule: ReminderRule;
  triggerDate: Date;
  tithi: string;
}

/**
 * Compute every (rule, triggerDate, tithi) triple to schedule across the
 * look-ahead window, with deduplication.  Returns a sorted list so that
 * earliest slots can be scheduled first.
 */
const buildSlots = (
  reminderRules: ReminderRule[],
  lat: number,
  lng: number,
  language: Language,
  now: number
): NotifSlot[] => {
  const seen   = new Set<string>();
  const slots: NotifSlot[] = [];

  const addSlot = (rule: ReminderRule, triggerDay: Date, tithi: string) => {
    const triggerDate = new Date(triggerDay);
    triggerDate.setHours(rule.hour, rule.minute, 0, 0);
    if (triggerDate.getTime() <= now) return;           // skip past
    const key = slotKey(triggerDate, rule.id);
    if (seen.has(key)) return;                          // skip duplicates
    seen.add(key);
    slots.push({ rule, triggerDate, tithi });
  };

  // Phase 1 — Immediate window (today's pivots for each rule)
  for (const rule of reminderRules) {
    const pivotDay = midnightAt(rule.daysOffset);
    const data     = getPanchanga(pivotDay, lat, lng, language);
    if (data.tithiIndex === rule.tithiIndex) {
      addSlot(rule, midnightAt(0), data.tithi);    // fire TODAY
    }
  }

  // Phase 2 — 60-day look-ahead
  for (let i = 0; i <= LOOKAHEAD_DAYS; i++) {
    const tithiDay = midnightAt(i);
    const data     = getPanchanga(tithiDay, lat, lng, language);
    for (const rule of reminderRules) {
      if (data.tithiIndex !== rule.tithiIndex) continue;
      addSlot(rule, midnightAt(i - rule.daysOffset), data.tithi);
    }
  }

  // Sort by trigger time ascending so earliest ones are sent first
  return slots.sort((a, b) => a.triggerDate.getTime() - b.triggerDate.getTime());
};

// ─── Main Export ──────────────────────────────────────────────────────────────

export const updateTithiReminders = async (
  reminderRules: ReminderRule[],
  lat: number,
  lng: number,
  language: Language = 'en'
): Promise<void> => {

  // Cancel only VedaKal's own previously scheduled notifications
  const previousIds = await loadStoredIds();
  await Promise.all(
    previousIds.map(id =>
      Notifications.cancelScheduledNotificationAsync(id).catch(() => {})
    )
  );
  await saveIds([]);

  if (reminderRules.length === 0) return;

  const now = Date.now();

  // Build all deduplicated slots synchronously (no async needed here)
  const slots = buildSlots(reminderRules, lat, lng, language, now);

  // Schedule ALL slots in parallel — no sequential await bottleneck
  const ids = (
    await Promise.all(
      slots.map(async ({ rule, triggerDate, tithi }) => {
        const { title, body } = buildContent(tithi, rule.daysOffset, language);
        try {
          return await Notifications.scheduleNotificationAsync({
            content: {
              title: `🔔 ${title}`,
              body,
              data: { tithiIndex: rule.tithiIndex, ruleId: rule.id },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: triggerDate,
            },
          });
        } catch {
          return null;
        }
      })
    )
  ).filter((id): id is string => id !== null);

  await saveIds(ids);
};
