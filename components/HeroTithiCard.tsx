import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, Path, RadialGradient, Stop } from 'react-native-svg';
import { Radius, Spacing } from '../constants/DesignTokens';
import { Language } from '../constants/Strings';
import { PanchangaData } from '../services/PanchangaService';

interface Props {
    data: PanchangaData | null;
    language: Language;
}

// Beautiful Lotus Icon SVG Component
const LotusIcon = ({ size = 70 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <Defs>
            <RadialGradient id="lotusGradient" cx="50%" cy="50%">
                <Stop offset="0%" stopColor="#FFE5EC" stopOpacity="1" />
                <Stop offset="50%" stopColor="#FFB6D9" stopOpacity="1" />
                <Stop offset="100%" stopColor="#FF8DC7" stopOpacity="0.9" />
            </RadialGradient>
            <RadialGradient id="centerGradient" cx="50%" cy="50%">
                <Stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                <Stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
            </RadialGradient>
        </Defs>

        <G transform="translate(60, 60)">
            {/* Bottom layer - largest petals */}
            <G opacity="0.85">
                <Path d="M0,-35 Q-8,-30 -10,-20 Q-10,-15 -8,-12 L0,-15 L8,-12 Q10,-15 10,-20 Q8,-30 0,-35 Z" fill="url(#lotusGradient)" />
                <Path d="M0,-35 Q8,-30 10,-20 Q10,-15 8,-12 L0,-15 L-8,-12 Q-10,-15 -10,-20 Q-8,-30 0,-35 Z" fill="#FFB6D9" opacity="0.8" transform="rotate(45)" />
                <Path d="M0,-35 Q-8,-30 -10,-20 Q-10,-15 -8,-12 L0,-15 L8,-12 Q10,-15 10,-20 Q8,-30 0,-35 Z" fill="#FFB6D9" opacity="0.7" transform="rotate(90)" />
                <Path d="M0,-35 Q8,-30 10,-20 Q10,-15 8,-12 L0,-15 L-8,-12 Q-10,-15 -10,-20 Q-8,-30 0,-35 Z" fill="#FFB6D9" opacity="0.7" transform="rotate(135)" />
                <Path d="M0,-35 Q-8,-30 -10,-20 Q-10,-15 -8,-12 L0,-15 L8,-12 Q10,-15 10,-20 Q8,-30 0,-35 Z" fill="#FFC0CB" opacity="0.6" transform="rotate(180)" />
                <Path d="M0,-35 Q8,-30 10,-20 Q10,-15 8,-12 L0,-15 L-8,-12 Q-10,-15 -10,-20 Q-8,-30 0,-35 Z" fill="#FFC0CB" opacity="0.6" transform="rotate(225)" />
                <Path d="M0,-35 Q-8,-30 -10,-20 Q-10,-15 -8,-12 L0,-15 L8,-12 Q10,-15 10,-20 Q8,-30 0,-35 Z" fill="#FFC0CB" opacity="0.5" transform="rotate(270)" />
                <Path d="M0,-35 Q8,-30 10,-20 Q10,-15 8,-12 L0,-15 L-8,-12 Q-10,-15 -10,-20 Q-8,-30 0,-35 Z" fill="#FFC0CB" opacity="0.5" transform="rotate(315)" />
            </G>

            {/* Middle layer - medium petals */}
            <G opacity="0.9">
                <Path d="M0,-28 Q-6,-24 -7,-16 Q-7,-12 -5,-10 L0,-12 L5,-10 Q7,-12 7,-16 Q6,-24 0,-28 Z" fill="url(#lotusGradient)" />
                <Path d="M0,-28 Q6,-24 7,-16 Q7,-12 5,-10 L0,-12 L-5,-10 Q-7,-12 -7,-16 Q-6,-24 0,-28 Z" fill="#FFD1E3" transform="rotate(22.5)" />
                <Path d="M0,-28 Q-6,-24 -7,-16 Q-7,-12 -5,-10 L0,-12 L5,-10 Q7,-12 7,-16 Q6,-24 0,-28 Z" fill="#FFD1E3" transform="rotate(67.5)" />
                <Path d="M0,-28 Q6,-24 7,-16 Q7,-12 5,-10 L0,-12 L-5,-10 Q-7,-12 -7,-16 Q-6,-24 0,-28 Z" fill="#FFD1E3" transform="rotate(112.5)" />
                <Path d="M0,-28 Q-6,-24 -7,-16 Q-7,-12 -5,-10 L0,-12 L5,-10 Q7,-12 7,-16 Q6,-24 0,-28 Z" fill="#FFE5EC" opacity="0.9" transform="rotate(157.5)" />
                <Path d="M0,-28 Q6,-24 7,-16 Q7,-12 5,-10 L0,-12 L-5,-10 Q-7,-12 -7,-16 Q-6,-24 0,-28 Z" fill="#FFE5EC" opacity="0.9" transform="rotate(202.5)" />
                <Path d="M0,-28 Q-6,-24 -7,-16 Q-7,-12 -5,-10 L0,-12 L5,-10 Q7,-12 7,-16 Q6,-24 0,-28 Z" fill="#FFE5EC" opacity="0.8" transform="rotate(247.5)" />
                <Path d="M0,-28 Q6,-24 7,-16 Q7,-12 5,-10 L0,-12 L-5,-10 Q-7,-12 -7,-16 Q-6,-24 0,-28 Z" fill="#FFE5EC" opacity="0.8" transform="rotate(292.5)" />
                <Path d="M0,-28 Q-6,-24 -7,-16 Q-7,-12 -5,-10 L0,-12 L5,-10 Q7,-12 7,-16 Q6,-24 0,-28 Z" fill="#FFE5EC" opacity="0.8" transform="rotate(337.5)" />
            </G>

            {/* Inner layer - small petals */}
            <G opacity="0.95">
                <Path d="M0,-18 Q-4,-15 -5,-10 Q-5,-7 -3,-6 L0,-8 L3,-6 Q5,-7 5,-10 Q4,-15 0,-18 Z" fill="#FFE5F0" />
                <Path d="M0,-18 Q4,-15 5,-10 Q5,-7 3,-6 L0,-8 L-3,-6 Q-5,-7 -5,-10 Q-4,-15 0,-18 Z" fill="#FFE5F0" transform="rotate(45)" />
                <Path d="M0,-18 Q-4,-15 -5,-10 Q-5,-7 -3,-6 L0,-8 L3,-6 Q5,-7 5,-10 Q4,-15 0,-18 Z" fill="#FFEEF5" transform="rotate(90)" />
                <Path d="M0,-18 Q4,-15 5,-10 Q5,-7 3,-6 L0,-8 L-3,-6 Q-5,-7 -5,-10 Q-4,-15 0,-18 Z" fill="#FFEEF5" transform="rotate(135)" />
                <Path d="M0,-18 Q-4,-15 -5,-10 Q-5,-7 -3,-6 L0,-8 L3,-6 Q5,-7 5,-10 Q4,-15 0,-18 Z" fill="#FFF5F8" transform="rotate(180)" />
                <Path d="M0,-18 Q4,-15 5,-10 Q5,-7 3,-6 L0,-8 L-3,-6 Q-5,-7 -5,-10 Q-4,-15 0,-18 Z" fill="#FFF5F8" transform="rotate(225)" />
            </G>

            {/* Center - seed pod */}
            <Circle cx="0" cy="0" r="5" fill="url(#centerGradient)" />
            <Circle cx="0" cy="0" r="3.5" fill="#FFD700" opacity="0.6" />

            {/* Center details - stamens */}
            <G opacity="0.7">
                <Circle cx="0" cy="-2" r="0.8" fill="#FFA500" />
                <Circle cx="1.5" cy="-1" r="0.8" fill="#FFA500" />
                <Circle cx="1.5" cy="1" r="0.8" fill="#FFA500" />
                <Circle cx="0" cy="2" r="0.8" fill="#FFA500" />
                <Circle cx="-1.5" cy="1" r="0.8" fill="#FFA500" />
                <Circle cx="-1.5" cy="-1" r="0.8" fill="#FFA500" />
            </G>
        </G>
    </Svg>
);

const HeroTithiCard = ({ data, language }: Props) => {
    if (!data) return null;

    return (
        <View style={styles.cardContainer}>
            <LinearGradient
                colors={['#FFD60A', '#FFCC70', '#FF9F71']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.content}>
                    <LotusIcon size={50} />
                    <Text style={styles.title}>{data.tithi}</Text>
                    <Text style={styles.subtitle}>Today, {data.sunrise}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: Spacing.base,
    },
    card: {
        borderRadius: Radius.xlarge,
        padding: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 160,
        shadowColor: '#FF9933',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 12,
    },
    content: {
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
});

export default HeroTithiCard;
