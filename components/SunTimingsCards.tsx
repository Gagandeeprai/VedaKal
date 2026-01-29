import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { Colors, Radius, Spacing, Typography } from '../constants/DesignTokens';
import { Language, Strings } from '../constants/Strings';
import { useTheme } from '../hooks/useTheme';
import { PanchangaData } from '../services/PanchangaService';

interface Props {
    data: PanchangaData | null;
    language: Language;
}

// Sunrise Icon
const SunriseIcon = ({ size = 24 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G>
            <Circle cx="12" cy="10" r="3" fill="#FF9500" />
            <Path d="M12 3V5M12 15V17M5 10H7M17 10H19M7.05 6.05L8.46 7.46M16.95 6.05L15.54 7.46"
                stroke="#FF9500" strokeWidth="1.5" strokeLinecap="round" />
            <Path d="M4 18C4 18 6 16 12 16C18 16 20 18 20 18"
                stroke="#FF9500" strokeWidth="2" strokeLinecap="round" />
            <Path d="M2 21H22" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" />
        </G>
    </Svg>
);

// Sunset Icon
const SunsetIcon = ({ size = 24 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G>
            <Circle cx="12" cy="10" r="3" fill="#FF6B35" />
            <Path d="M12 3V5M12 15V17M5 10H7M17 10H19M7.05 6.05L8.46 7.46M16.95 6.05L15.54 7.46"
                stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" />
            <Path d="M4 18C4 18 6 20 12 20C18 20 20 18 20 18"
                stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
            <Path d="M2 21H22" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
        </G>
    </Svg>
);

const SunTimingsCards = ({ data, language }: Props) => {
    const labels = Strings[language];
    const { colors } = useTheme();

    if (!data || !data.sunrise || data.sunrise === "--:--") return null;

    return (
        <View style={styles.container}>
            {/* Sunrise Card */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
                <SunriseIcon size={28} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.sunrise}</Text>
                <Text style={[styles.time, { color: colors.textPrimary }]}>{data.sunrise}</Text>
            </View>

            {/* Sunset Card */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
                <SunsetIcon size={28} />
                <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.sunset}</Text>
                <Text style={[styles.time, { color: colors.textPrimary }]}>{data.sunset}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginVertical: Spacing.sm,
    },
    card: {
        flex: 1,
        borderRadius: Radius.large,
        padding: Spacing.base,
        alignItems: 'center',
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    label: {
        ...Typography.footnote,
        marginTop: Spacing.xs,
    },
    time: {
        ...Typography.title.standard,
        fontWeight: '600',
        marginTop: 2,
    },
});

export default SunTimingsCards;
