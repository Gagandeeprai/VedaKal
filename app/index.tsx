import HeroTithiCard from '@/components/HeroTithiCard';
import InauspiciousGrid from '@/components/InauspiciousGrid';
import PanchangaDetailsCard from '@/components/PanchangaDetailsCard';
import SettingsModal from '@/components/SettingsModal';
import SunTimingsCards from '@/components/SunTimingsCards';
import { Colors, Spacing, Typography } from '@/constants/DesignTokens';
import { Strings } from '@/constants/Strings';
import { useTheme } from '@/hooks/useTheme';
import { getPanchanga, PanchangaData } from '@/services/PanchangaService';
import { useAppStore } from '@/store';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { currentLanguage, selectedCity } = useAppStore();
  const { colors, isDark } = useTheme();
  const labels = Strings[currentLanguage];

  const [data, setData] = useState<PanchangaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const now = new Date();
        const result = getPanchanga(now, selectedCity.lat, selectedCity.lng, currentLanguage);
        setData(result);
      } catch (e) {
        console.error("Error fetching panchanga:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedCity, currentLanguage]);

  // Format current date with localization
  const formatDate = () => {
    const now = new Date();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const monthName = labels.months[monthIndex];
    return `${day} ${monthName}`;
  };

  // Get day of week
  const getDayOfWeek = () => {
    if (!data) return labels.today;
    return data.vara;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Title Header with Language Toggle */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={[styles.largeTitle, { color: colors.textPrimary }]}>{getDayOfWeek()}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{formatDate()}  {selectedCity.name}</Text>
          </View>

          {/* Settings Button in Top Right */}
          <View style={styles.headerRight}>
            <SettingsModal />
          </View>
        </View>

        {/* Hero Card - Tithi with Progress Ring */}
        {!loading && data && (
          <HeroTithiCard data={data} language={currentLanguage} />
        )}

        {loading && (
          <View style={styles.loadingCard}>
            <Image
              source={require('../assets/logo-bw.png')}
              style={styles.loadingLogo}
              contentFit="contain"
            />
          </View>
        )}

        {/* Panchanga Details - Inset Grouped List */}
        {!loading && data && (
          <PanchangaDetailsCard data={data} language={currentLanguage} />
        )}

        {/* Samvatsara & Season Card */}
        {!loading && data && (
          <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{labels.samvatsara}</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{data.samvatsara}</Text>
            </View>
            <View style={[styles.separator, { backgroundColor: isDark ? '#333' : '#E5E5EA' }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{labels.ayana}</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{data.ayana}</Text>
            </View>
            <View style={[styles.separator, { backgroundColor: isDark ? '#333' : '#E5E5EA' }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{labels.ritu}</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{data.ritu}</Text>
            </View>
          </View>
        )}

        {/* Sun Timings Cards */}
        {!loading && data && (
          <SunTimingsCards data={data} language={currentLanguage} />
        )}

        {/* Inauspicious Periods */}
        {!loading && data && (
          <InauspiciousGrid data={data} language={currentLanguage} />
        )}


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginTop: 4,
  },
  largeTitle: {
    ...Typography.title.large,
    color: Colors.text.primary.light,
  },
  subtitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
    maxWidth: '80%',
  },
  subtitle: {
    ...Typography.subheadline,
    color: Colors.text.secondary.light,
  },
  changeText: {
    ...Typography.subheadline,
    color: Colors.semantic.blue,
    fontWeight: '500',
  },
  loadingCard: {
    backgroundColor: Colors.surface.light,
    borderRadius: 22,
    padding: Spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  loadingLogo: {
    width: 64,
    height: 64,
    opacity: 0.6,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.text.secondary.light,
  },
  infoCard: {
    borderRadius: 16,
    paddingHorizontal: Spacing.base,
    marginVertical: Spacing.sm,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.base,
  },
  infoLabel: {
    ...Typography.body,
  },
  infoValue: {
    ...Typography.callout,
    fontWeight: '600',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 0,
  },
});

