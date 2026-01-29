import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../constants/DesignTokens';
import { Language, Strings } from '../constants/Strings';
import { useTheme } from '../hooks/useTheme';
import { PanchangaData } from '../services/PanchangaService';

interface Props {
    data: PanchangaData | null;
    language: Language;
}

const InauspiciousGrid = ({ data, language }: Props) => {
    const labels = Strings[language];
    const { colors, isDark } = useTheme();

    if (!data) return null;

    const periods = [
        {
            name: labels.rahuKalam,
            time: data.rahuKalam,
        },
        {
            name: labels.yamaganda,
            time: data.yamaganda,
        },
        {
            name: labels.gulikaKalam,
            time: data.gulikaKalam,
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{labels.inauspiciousPeriods}</Text>
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
                {periods.map((period, index) => (
                    <View key={period.name}>
                        <View style={styles.periodRow}>
                            <View style={styles.periodLeft}>
                                <Text style={styles.icon}>⚠️</Text>
                                <Text style={[styles.periodName, { color: colors.textPrimary }]}>{period.name}</Text>
                            </View>
                            <Text style={[styles.periodTime, { color: Colors.semantic.red }]}>{period.time}</Text>
                        </View>
                        {index < periods.length - 1 && (
                            <View style={[styles.divider, { backgroundColor: isDark ? '#333' : '#E5E5EA' }]} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: Spacing.sm,
    },
    sectionTitle: {
        ...Typography.headline,
        marginBottom: Spacing.md,
        paddingHorizontal: Spacing.base,
    },
    card: {
        borderRadius: Radius.large,
        padding: Spacing.base,
        marginHorizontal: Spacing.base,
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    periodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    periodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    icon: {
        fontSize: 20,
    },
    periodName: {
        ...Typography.body,
        fontWeight: '500',
    },
    periodTime: {
        ...Typography.callout,
        fontWeight: '600',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        marginVertical: Spacing.xs,
    },
});

export default InauspiciousGrid;
