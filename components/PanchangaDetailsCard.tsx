import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Radius, Spacing, Typography } from '../constants/DesignTokens';
import { Language, Strings } from '../constants/Strings';
import { useTheme } from '../hooks/useTheme';
import { PanchangaData } from '../services/PanchangaService';

interface Props {
    data: PanchangaData | null;
    language: Language;
}

// Icon Components
const StarIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2L14.09 8.26L21 9.27L16.5 13.97L17.91 21L12 17.77L6.09 21L7.5 13.97L3 9.27L9.91 8.26L12 2Z"
            fill={color}
        />
    </Svg>
);

const CalendarIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z"
            fill={color}
        />
    </Svg>
);

const YogaIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M2 12C2 9.79 3.79 8 6 8C7.5 8 8.81 8.83 9.5 10.08C10.19 8.83 11.5 8 13 8C15.21 8 17 9.79 17 12C17 14.21 15.21 16 13 16C11.5 16 10.19 15.17 9.5 13.92C8.81 15.17 7.5 16 6 16C3.79 16 2 14.21 2 12Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </Svg>
);

const MoonIcon = ({ color, size = 20 }: { color: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 11.54 20.96 11.08 20.9 10.64C19.92 12.01 18.32 12.9 16.5 12.9C13.52 12.9 11.1 10.48 11.1 7.5C11.1 5.68 11.99 4.08 13.36 3.1C12.92 3.04 12.46 3 12 3Z"
            fill={color}
        />
    </Svg>
);

const PanchangaDetailsCard = ({ data, language }: Props) => {
    const labels = Strings[language];
    const { colors } = useTheme();

    if (!data) return null;

    const renderRow = (
        IconComponent: React.ComponentType<{ color: string; size?: number }>,
        iconColor: string,
        label: string,
        value: string,
        endTime?: string
    ) => (
        <View style={styles.row}>
            <View style={styles.leftSection}>
                <View style={styles.iconContainer}>
                    <IconComponent color={iconColor} size={22} />
                </View>
                <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
            </View>
            <View style={styles.rightSection}>
                <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
                {endTime && endTime !== "--:--" && (
                    <Text style={[styles.endTime, { color: colors.textSecondary }]}>till {endTime}</Text>
                )}
            </View>
        </View>
    );

    return (
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
            {renderRow(
                StarIcon,
                Colors.icons.nakshatra,
                labels.nakshatra,
                data.nakshatra,
                data.nakshatraEndTime
            )}

            <View style={styles.separator} />

            {renderRow(
                CalendarIcon,
                Colors.icons.vara,
                labels.vara,
                data.vara
            )}

            <View style={styles.separator} />

            {renderRow(
                YogaIcon,
                Colors.icons.yoga,
                labels.yoga,
                data.yoga
            )}

            <View style={styles.separator} />

            {renderRow(
                MoonIcon,
                Colors.icons.karana,
                labels.karana,
                data.karana
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: Radius.large,
        paddingHorizontal: Spacing.base,
        marginVertical: Spacing.sm,
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 28,
        height: 28,
        marginRight: Spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        ...Typography.body,
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    value: {
        ...Typography.callout,
        fontWeight: '600',
    },
    endTime: {
        ...Typography.footnote,
        marginTop: 2,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.text.tertiary.light,
        marginLeft: 44,
    },
});

export default PanchangaDetailsCard;
