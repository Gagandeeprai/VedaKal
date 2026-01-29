import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Colors, Radius, Spacing, Typography } from '../constants/DesignTokens';
import { Language, Strings } from '../constants/Strings';
import { PanchangaData } from '../services/PanchangaService';

interface Props {
    data: PanchangaData | null;
    language: Language;
}

const SunTimingsGraph = ({ data, language }: Props) => {
    const labels = Strings[language];
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000); //Update every minute
        return () => clearInterval(timer);
    }, []);

    if (!data || !data.sunrise || data.sunrise === "--:--") return null;

    const width = Dimensions.get('window').width - (Spacing.base * 2);
    const height = 100;
    const padding = 20;

    // Parse sunrise and sunset times
    const parseSunTime = (timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const d = new Date();
        d.setHours(hours, minutes, 0, 0);
        return d;
    };

    const sunrise = parseSunTime(data.sunrise);
    const sunset = parseSunTime(data.sunset);

    // Calculate sun position (0 to 1 across the day)
    const getSunPosition = (): number => {
        const now = currentTime.getTime();
        const start = sunrise.getTime();
        const end = sunset.getTime();

        if (now < start) return 0;
        if (now > end) return 1;

        return (now - start) / (end - start);
    };

    const sunPosition = getSunPosition();

    // Generate sinusoidal curve path
    const generateCurvePath = (): string => {
        const points: string[] = [];
        const steps = 50;

        for (let i = 0; i <= steps; i++) {
            const x = padding + (i / steps) * (width - 2 * padding);
            const progress = i / steps;
            // Sine wave: starts at 0, peaks at 0.5, ends at 0
            const y = height - padding - Math.sin(progress * Math.PI) * (height - 2 * padding);

            if (i === 0) {
                points.push(`M ${x} ${y}`);
            } else {
                points.push(`L ${x} ${y}`);
            }
        }

        return points.join(' ');
    };

    // Calculate sun icon position on curve
    const sunX = padding + sunPosition * (width - 2 * padding);
    const sunY = height - padding - Math.sin(sunPosition * Math.PI) * (height - 2 * padding);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{labels.sunTimings}</Text>

            <View style={styles.graphContainer}>
                <Svg width={width} height={height}>
                    {/* Curve path */}
                    <Path
                        d={generateCurvePath()}
                        stroke={Colors.semantic.orange}
                        strokeWidth={2}
                        fill="none"
                    />

                    {/* Sun position indicator */}
                    {sunPosition >= 0 && sunPosition <= 1 && (
                        <Circle
                            cx={sunX}
                            cy={sunY}
                            r={8}
                            fill={Colors.semantic.yellow}
                        />
                    )}
                </Svg>

                {/* Time labels */}
                <View style={styles.timeLabels}>
                    <View style={styles.timeLabel}>
                        <Text style={styles.timeText}>{data.sunrise}</Text>
                        <Text style={styles.timeLabelText}>{labels.sunrise}</Text>
                    </View>
                    <View style={styles.timeLabel}>
                        <Text style={styles.timeText}>{data.sunset}</Text>
                        <Text style={styles.timeLabelText}>{labels.sunset}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface.light,
        borderRadius: Radius.large,
        padding: Spacing.base,
        marginVertical: Spacing.sm,
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        ...Typography.headline,
        color: Colors.text.primary.light,
        marginBottom: Spacing.md,
    },
    graphContainer: {
        position: 'relative',
    },
    timeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.sm,
        paddingHorizontal: Spacing.sm,
    },
    timeLabel: {
        alignItems: 'center',
    },
    timeText: {
        ...Typography.callout,
        fontWeight: '600',
        color: Colors.text.primary.light,
    },
    timeLabelText: {
        ...Typography.caption,
        color: Colors.text.secondary.light,
        marginTop: 2,
    },
});

export default SunTimingsGraph;
