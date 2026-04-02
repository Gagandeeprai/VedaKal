import React, { useState, useRef } from 'react';
import {
    Modal, ScrollView, StyleSheet, Text, TouchableOpacity,
    TouchableWithoutFeedback, View, Switch, Platform, Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import Svg, { Path } from 'react-native-svg';
import { TITHIS } from '../constants/PanchangaNames';
import { useTheme } from '../hooks/useTheme';
import { useAppStore, ReminderRule } from '../store';
import { useReminders } from '../hooks/useReminders';

// --- Icons ---
const BellIcon = ({ size = 24, color = '#000' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" fill={color} />
    </Svg>
);
const TrashIcon = ({ size = 20, color = '#FF3B30' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);
const EditIcon = ({ size = 20, color = '#007AFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);
const PlusIcon = ({ size = 24, color = '#FFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);
const ChevronIcon = ({ color = '#888' }: { color?: string }) => (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

// --- Floating Dropdown (overlay, doesn't push content down) ---
interface DropdownProps {
    label: string;
    items: string[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    isDark: boolean;
    colors: any;
}

const { width: SCREEN_W } = Dimensions.get('window');

const Dropdown = ({ label, items, selectedIndex, onSelect, isDark, colors }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0, w: 0 });
    const triggerRef = useRef<View>(null);

    const bg = isDark ? '#1C1C1E' : '#FFFFFF';
    const borderColor = isDark ? '#3A3A3C' : '#D1D1D6';
    const pillBg = isDark ? '#2A2A2C' : '#F2F2F7';

    const handleOpen = () => {
        triggerRef.current?.measureInWindow((x, y, width, height) => {
            setMenuPos({ x, y: y + height + 6, w: width });
            setOpen(true);
        });
    };

    return (
        <View style={dropStyles.wrapper}>
            <Text style={[dropStyles.label, { color: colors.textSecondary }]}>{label}</Text>
            <View ref={triggerRef} collapsable={false}>
                <TouchableOpacity
                    onPress={() => open ? setOpen(false) : handleOpen()}
                    activeOpacity={0.8}
                    style={[dropStyles.trigger, { backgroundColor: open ? bg : pillBg, borderColor: open ? '#007AFF' : borderColor }]}
                >
                    <Text style={[dropStyles.triggerText, { color: open ? '#007AFF' : colors.textPrimary }]}>
                        {items[selectedIndex]}
                    </Text>
                    <ChevronIcon color={open ? '#007AFF' : colors.textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Floating overlay — rendered above everything via transparent Modal */}
            <Modal visible={open} transparent animationType="none" onRequestClose={() => setOpen(false)}>
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                    <View style={dropStyles.backdrop}>
                        <View style={[
                            dropStyles.menu,
                            { backgroundColor: bg, borderColor, left: menuPos.x, top: menuPos.y, width: menuPos.w }
                        ]}>
                            {items.map((item, index) => {
                                const isActive = index === selectedIndex;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => { onSelect(index); setOpen(false); }}
                                        activeOpacity={0.6}
                                        style={[
                                            dropStyles.option,
                                            index < items.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: borderColor },
                                            isActive && { backgroundColor: isDark ? '#2A2A2C' : '#EFF5FF' }
                                        ]}
                                    >
                                        <Text style={[dropStyles.optionText, { color: isActive ? '#007AFF' : colors.textPrimary }, isActive && dropStyles.optionActive]}>
                                            {item}
                                        </Text>
                                        {isActive && <Text style={dropStyles.checkmark}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const dropStyles = StyleSheet.create({
    wrapper: { flex: 1 },
    label: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
    trigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 13, borderRadius: 14, borderWidth: 1.5 },
    triggerText: { fontSize: 15, fontWeight: '700' },
    backdrop: { flex: 1 },
    menu: { position: 'absolute', borderRadius: 14, borderWidth: 1.5, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.14, shadowRadius: 12, elevation: 10 },
    option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
    optionText: { fontSize: 15 },
    optionActive: { fontWeight: '700' as const },
    checkmark: { color: '#007AFF', fontSize: 16, fontWeight: '700' as const },
});

// --- Main Component ---
type Paksha = 'shukla' | 'krishna' | 'both';

const RemindersModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editRuleId, setEditRuleId] = useState<string | null>(null);

    // Tithi selection state
    const [paksha, setPaksha] = useState<Paksha>('shukla');
    const [newTithi, setNewTithi] = useState<number>(10); // Default Shukla Ekadashi

    // Offset state
    const [newOffset, setNewOffset] = useState<number>(0);

    // Time dropdown state
    const hours12 = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')); // 01–12
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    const ampm = ['AM', 'PM'];

    const [hourIndex, setHourIndex] = useState(5);   // default 06
    const [minuteIndex, setMinuteIndex] = useState(0); // default 00
    const [ampmIndex, setAmpmIndex] = useState(0);   // default AM

    const { currentLanguage, remindersEnabled, setRemindersEnabled, reminderRules, addReminderRule, updateReminderRule, removeReminderRule } = useAppStore();
    const { colors, isDark } = useTheme();
    const { requestPermissionAndEnable } = useReminders();

    const tithiNames = TITHIS[currentLanguage] || TITHIS['en'];
    const shuklaTithis = tithiNames.slice(0, 15).map((name, i) => ({ name, globalIndex: i }));
    const krishnaTithis = tithiNames.slice(15, 30).map((name, i) => ({ name, globalIndex: i + 15 }));

    // For 'both': show all 14 common tithis (Pratipada–Chaturdashi) + Purnima + Amavasya
    // Selecting Pratipada–Chaturdashi saves TWO rules (Shukla + Krishna), special ones save one
    const BOTH_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 29];

    const getFilteredTithis = () => {
        if (paksha === 'shukla') return shuklaTithis;
        if (paksha === 'krishna') return krishnaTithis;
        // 'both': show the 6 curated positions using current language names (stripped)
        return BOTH_POSITIONS.map(pos => ({
            name: tithiNames[pos].replace(/^(Shukla |Krishna |ಶುಕ್ಲ |ಕೃಷ್ಣ |शुक्ल |कृष्ण )/, ''),
            globalIndex: pos
        }));
    };

    const handleToggle = async (value: boolean) => {
        if (value) await requestPermissionAndEnable();
        else setRemindersEnabled(false);
    };

    const getActualHour = () => {
        let h = parseInt(hours12[hourIndex]);
        if (ampmIndex === 0 && h === 12) h = 0;
        if (ampmIndex === 1 && h !== 12) h = h + 12;
        return h;
    };

    const saveRule = () => {
        const hour = getActualHour();
        const minute = parseInt(minutes[minuteIndex]);
        const baseRule: Omit<ReminderRule, 'id' | 'tithiIndex'> = { daysOffset: newOffset, hour, minute };

        if (editRuleId) {
            if (paksha === 'both' && newTithi < 14) {
                updateReminderRule(editRuleId, { ...baseRule, tithiIndex: newTithi });
                addReminderRule({ ...baseRule, id: (Date.now() + 1).toString(), tithiIndex: newTithi + 15 });
            } else {
                updateReminderRule(editRuleId, { ...baseRule, tithiIndex: newTithi });
            }
        } else {
            if (paksha === 'both' && newTithi < 14) {
                // For common tithis (1-4), save TWO rules: Shukla + Krishna variants
                addReminderRule({ ...baseRule, id: Date.now().toString(), tithiIndex: newTithi });
                addReminderRule({ ...baseRule, id: (Date.now() + 1).toString(), tithiIndex: newTithi + 15 });
            } else {
                addReminderRule({ ...baseRule, id: Date.now().toString(), tithiIndex: newTithi });
            }
        }
        setIsAdding(false);
        setEditRuleId(null);
        resetForm();
    };

    const resetForm = () => {
        setPaksha('shukla');
        setNewTithi(10);
        setNewOffset(0);
        setHourIndex(5);
        setMinuteIndex(0);
        setAmpmIndex(0);
    };

    const handleEditRule = (rule: ReminderRule) => {
        // Pre-populate form state
        if (rule.tithiIndex < 15) {
            setPaksha('shukla');
            setNewTithi(rule.tithiIndex);
        } else if (rule.tithiIndex < 30) {
            setPaksha('krishna');
            setNewTithi(rule.tithiIndex);
        } else {
            // Special tithi handling (if applicable, typically our logic maps Purnima/Amavasya reliably by index)
            setPaksha('shukla');
            setNewTithi(rule.tithiIndex);
        }

        setNewOffset(rule.daysOffset);

        // Prep time
        const h12 = rule.hour % 12 === 0 ? 12 : rule.hour % 12;
        const periodIndex = rule.hour < 12 ? 0 : 1;
        
        setHourIndex(hours12.indexOf(String(h12).padStart(2, '0')) >= 0 ? hours12.indexOf(String(h12).padStart(2, '0')) : 5);
        setMinuteIndex(minutes.indexOf(String(rule.minute).padStart(2, '0')) >= 0 ? minutes.indexOf(String(rule.minute).padStart(2, '0')) : 0);
        setAmpmIndex(periodIndex);

        setEditRuleId(rule.id);
        setIsAdding(true);
    };

    const sendTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: { title: "🔔 Tithi Reminder Test!", body: "Om Swasti! Your notification system is working perfectly." },
            trigger: null,
        });
    };

    const formatTime = (hour: number, minute: number) => {
        const h12 = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? 'AM' : 'PM';
        return `${h12}:${String(minute).padStart(2, '0')} ${period}`;
    };

    const renderRuleItem = (rule: ReminderRule) => {
        const tithiName = tithiNames[rule.tithiIndex];
        const offsetLabel = rule.daysOffset === 0 ? "Today" : rule.daysOffset === 1 ? "Day Before" : "Week Before";
        return (
            <View key={rule.id} style={[styles.ruleCard, { backgroundColor: isDark ? '#2A2A2C' : '#F2F2F7', borderColor: isDark ? '#333' : '#E5E5EA' }]}>
                <View style={styles.ruleInfo}>
                    <Text style={[styles.ruleTithi, { color: colors.textPrimary }]}>{tithiName}</Text>
                    <Text style={[styles.ruleDetail, { color: colors.textSecondary }]}>{offsetLabel} at {formatTime(rule.hour, rule.minute)}</Text>
                </View>
                <View style={styles.ruleActions}>
                    <TouchableOpacity onPress={() => handleEditRule(rule)} style={styles.actionButton} activeOpacity={0.6}>
                        <EditIcon color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeReminderRule(rule.id)} style={styles.actionButton} activeOpacity={0.6}>
                        <TrashIcon />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderRuleBuilder = () => {
        const offsets = [{ label: "Today", value: 0 }, { label: "Day Before", value: 1 }, { label: "Week Before", value: 7 }];
        const filteredTithis = getFilteredTithis();

        return (
            <View style={styles.builderContainer}>

                {/* ── STEP 1: TIME (top) ── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>1. At what time?</Text>
                    <View style={styles.dropdownRow}>
                        <Dropdown label="Hour" items={hours12} selectedIndex={hourIndex} onSelect={setHourIndex} isDark={isDark} colors={colors} />
                        <View style={styles.dropdownSpacer} />
                        <Dropdown label="Minute" items={minutes} selectedIndex={minuteIndex} onSelect={setMinuteIndex} isDark={isDark} colors={colors} />
                        <View style={styles.dropdownSpacer} />
                        <Dropdown label="Period" items={ampm} selectedIndex={ampmIndex} onSelect={setAmpmIndex} isDark={isDark} colors={colors} />
                    </View>
                </View>

                {/* ── STEP 2: PAKSHA ── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>2. Choose Paksha</Text>
                    <View style={styles.segmentedControl}>
                        {(['shukla', 'krishna', 'both'] as Paksha[]).map(p => (
                            <TouchableOpacity
                                key={p}
                                onPress={() => { setPaksha(p); setNewTithi(p === 'krishna' ? 15 : 0); }}
                                activeOpacity={0.8}
                                style={[styles.segmentButton, paksha === p ? styles.segmentActive : { backgroundColor: isDark ? '#333' : '#E5E5EA' }]}
                            >
                                <Text style={[styles.segmentText, { color: colors.textPrimary }, paksha === p && styles.selectedText]}>
                                    {p === 'shukla' ? '🌕 Shukla' : p === 'krishna' ? '🌑 Krishna' : '☯ Both'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* ── STEP 3: TITHI CHIPS ── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>3. Select Tithi</Text>
                    <View style={styles.chipGrid}>
                        {getFilteredTithis().map(({ name, globalIndex }) => {
                            const isSelected = newTithi === globalIndex;
                            return (
                                <TouchableOpacity
                                    key={globalIndex}
                                    onPress={() => setNewTithi(globalIndex)}
                                    activeOpacity={0.8}
                                    style={[styles.tithiChip, isSelected ? styles.chipSelected : { backgroundColor: isDark ? '#2A2A2C' : '#F0F0F5' }]}
                                >
                                    <Text style={[styles.chipText, { color: colors.textPrimary }, isSelected && styles.selectedText]}>
                                        {paksha === 'shukla' || paksha === 'krishna'
                                            ? name.replace(/^(Shukla |Krishna |ಶುಕ್ಲ |ಕೃಷ್ಣ |शुक्ल |कृष्ण )/, '')
                                            : name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* ── STEP 4: OFFSET ── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>4. When to remind?</Text>
                    <View style={styles.segmentedControl}>
                        {offsets.map(o => (
                            <TouchableOpacity
                                key={o.value}
                                onPress={() => setNewOffset(o.value)}
                                activeOpacity={0.8}
                                style={[styles.segmentButton, newOffset === o.value ? styles.segmentActive : { backgroundColor: isDark ? '#333' : '#E5E5EA' }]}
                            >
                                <Text style={[styles.segmentText, { color: colors.textPrimary }, newOffset === o.value && styles.selectedText]}>
                                    {o.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* ── ACTIONS ── */}
                <View style={styles.builderActions}>
                    <TouchableOpacity onPress={() => { setIsAdding(false); setEditRuleId(null); resetForm(); }} style={styles.cancelButton} activeOpacity={0.7}>
                        <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={saveRule} style={styles.saveButton} activeOpacity={0.8}>
                        <Text style={styles.saveButtonText}>{editRuleId ? 'Update Reminder' : 'Save Reminder'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView edges={['bottom']}>
            <TouchableOpacity style={[styles.triggerButton, { backgroundColor: colors.surface }]} onPress={() => setIsOpen(true)} activeOpacity={0.7}>
                <BellIcon size={20} color={colors.textPrimary} />
            </TouchableOpacity>

            <Modal visible={isOpen} transparent animationType="slide" onRequestClose={() => { setIsOpen(false); setIsAdding(false); setEditRuleId(null); resetForm(); }}>
                <TouchableWithoutFeedback onPress={() => { setIsOpen(false); setIsAdding(false); setEditRuleId(null); resetForm(); }}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.panel, { backgroundColor: colors.surface }]}>

                                {/* Header */}
                                <View style={styles.header}>
                                    <View style={styles.headerLeft}>
                                        <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 122, 255, 0.1)' }]}>
                                            <BellIcon size={24} color="#007AFF" />
                                        </View>
                                        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                                            {isAdding ? (editRuleId ? 'Edit Reminder' : 'New Reminder') : 'Reminders'}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { setIsOpen(false); setIsAdding(false); setEditRuleId(null); resetForm(); }} activeOpacity={0.6}>
                                        <Text style={[styles.closeButton, { color: colors.textSecondary }]}>✕</Text>
                                    </TouchableOpacity>
                                </View>

                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} nestedScrollEnabled>

                                    {!isAdding && (
                                        <>
                                            <View style={[styles.masterToggleCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', borderColor: isDark ? '#333' : '#E5E5EA' }]}>
                                                <View style={styles.toggleTextContainer}>
                                                    <Text style={[styles.toggleTitle, { color: colors.textPrimary }]}>Enable Notifications</Text>
                                                    <TouchableOpacity onPress={sendTestNotification} activeOpacity={0.6}>
                                                        <Text style={styles.testPushLink}>Send Test Push</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <Switch value={remindersEnabled} onValueChange={handleToggle} trackColor={{ true: '#007AFF', false: isDark ? '#444' : '#D1D1D6' }} />
                                            </View>

                                            {remindersEnabled && (
                                                <View>
                                                    <View style={styles.listHeader}>
                                                        <Text style={[styles.listTitle, { color: colors.textPrimary }]}>Scheduled Alerts</Text>
                                                        <TouchableOpacity onPress={() => setIsAdding(true)} style={styles.fab} activeOpacity={0.8}>
                                                            <PlusIcon size={20} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    {reminderRules.length === 0 ? (
                                                        <View style={styles.emptyState}>
                                                            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                                                                {'No reminders yet.\nTap + to create one.'}
                                                            </Text>
                                                        </View>
                                                    ) : (
                                                        reminderRules.map(renderRuleItem)
                                                    )}
                                                </View>
                                            )}
                                        </>
                                    )}

                                    {isAdding && renderRuleBuilder()}

                                </ScrollView>
                                <View style={styles.bottomSafePadding} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    triggerButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
    panel: { width: '100%', height: '90%', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 24, shadowColor: '#000', shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    iconContainer: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 24, fontWeight: '700' },
    closeButton: { fontSize: 24, fontWeight: '300', padding: 4 },
    scrollContent: { paddingBottom: 32 },

    masterToggleCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderRadius: 20, borderWidth: 1, marginBottom: 28 },
    toggleTextContainer: { flex: 1 },
    toggleTitle: { fontSize: 17, fontWeight: '600' },
    testPushLink: { color: '#007AFF', fontWeight: '500', fontSize: 14, marginTop: 4 },

    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    listTitle: { fontSize: 20, fontWeight: '700' },
    fab: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#007AFF', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    emptyState: { paddingVertical: 60, alignItems: 'center' },
    emptyStateText: { fontSize: 16, textAlign: 'center', lineHeight: 24 },
    ruleCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 12 },
    ruleInfo: { flex: 1, paddingRight: 8 },
    ruleTithi: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    ruleDetail: { fontSize: 14 },
    ruleActions: { flexDirection: 'row', gap: 12 },
    actionButton: { padding: 4 },

    builderContainer: {},
    section: { marginBottom: 28 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 14 },

    segmentedControl: { flexDirection: 'row', gap: 8 },
    segmentButton: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
    segmentActive: { backgroundColor: '#007AFF', elevation: 3, shadowColor: '#007AFF', shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
    segmentText: { fontSize: 13, fontWeight: '600' },
    selectedText: { color: '#FFF' },

    chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    tithiChip: { paddingVertical: 9, paddingHorizontal: 14, borderRadius: 20 },
    chipSelected: { backgroundColor: '#007AFF', elevation: 4, shadowColor: '#007AFF', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
    chipText: { fontSize: 14, fontWeight: '500' },

    // Dropdown row
    dropdownRow: { flexDirection: 'row', alignItems: 'flex-start' },
    dropdownSpacer: { width: 10 },

    builderActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
    saveButton: { flex: 1, paddingVertical: 16, borderRadius: 16, backgroundColor: '#007AFF', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    cancelButton: { flex: 1, paddingVertical: 14, borderRadius: 16, borderWidth: 1.5, borderColor: '#E5E5EA', alignItems: 'center', justifyContent: 'center' },
    cancelButtonText: { fontSize: 16, fontWeight: '600' },

    bottomSafePadding: { height: Platform.OS === 'ios' ? 40 : 20 }
});

export default RemindersModal;
