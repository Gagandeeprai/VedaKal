/**
 * Design Tokens - Apple Human Interface Guidelines inspired
 * Following 8pt grid system and SF Pro Display typography scale
 */

// ========================================
// TYPOGRAPHY
// ========================================
// Simulating SF Pro Display font hierarchy
// React Native uses numeric weights: 100-900

export const Typography = {
    // Large Titles (Navigation headers)
    title: {
        large: {
            fontSize: 34,
            fontWeight: '700' as const, // Bold
            lineHeight: 41,
            letterSpacing: 0.37,
        },
        standard: {
            fontSize: 28,
            fontWeight: '700' as const,
            lineHeight: 34,
            letterSpacing: 0.36,
        },
    },

    // Headlines (Card titles)
    headline: {
        fontSize: 17,
        fontWeight: '600' as const, // Semibold
        lineHeight: 22,
        letterSpacing: -0.41,
    },

    // Body text
    body: {
        fontSize: 17,
        fontWeight: '400' as const, // Regular
        lineHeight: 22,
        letterSpacing: -0.41,
    },

    // Callout (Important values)
    callout: {
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 21,
        letterSpacing: -0.32,
    },

    // Subheadline (Secondary info)
    subheadline: {
        fontSize: 15,
        fontWeight: '400' as const,
        lineHeight: 20,
        letterSpacing: -0.24,
    },

    // Footnote (Timestamps, "till" text)
    footnote: {
        fontSize: 13,
        fontWeight: '400' as const,
        lineHeight: 18,
        letterSpacing: -0.08,
    },

    // Caption (Smallest text)
    caption: {
        fontSize: 12,
        fontWeight: '400' as const,
        lineHeight: 16,
        letterSpacing: 0,
    },
} as const;

// ========================================
// COLORS
// ========================================

export const Colors = {
    // System Backgrounds
    background: {
        light: '#F2F2F7',
        dark: '#000000',
    },

    // Card/Surface colors
    surface: {
        light: '#FFFFFF',
        dark: '#1C1C1E',
    },

    // Text colors
    text: {
        primary: {
            light: '#000000',
            dark: '#FFFFFF',
        },
        secondary: {
            light: '#3C3C43',
            dark: '#EBEBF5',
        },
        tertiary: {
            light: '#3C3C4399', // 60% opacity
            dark: '#EBEBF599',
        },
    },

    // Accent gradients for hero card
    gradients: {
        tithi: {
            start: '#FFD60A', // Warm gold
            middle: '#FFCC70',
            end: '#FF9F71', // Soft coral
        },
    },

    // Semantic colors (iOS standard)
    semantic: {
        red: '#FF3B30',
        orange: '#FF9500',
        yellow: '#FFCC00',
        green: '#34C759',
        mint: '#00C7BE',
        teal: '#30B0C7',
        cyan: '#32ADE6',
        blue: '#007AFF',
        indigo: '#5856D6',
        purple: '#AF52DE',
        pink: '#FF2D55',
        brown: '#A2845E',
    },

    // SF Symbol icon colors (matching mockup)
    icons: {
        nakshatra: '#FFB800', // Gold
        vara: '#FF3B30', // Red
        yoga: '#AF52DE', // Purple
        karana: '#007AFF', // Blue
        samvatsara: '#8E8E93', // Gray
    },

    // Shadow
    shadow: {
        color: '#000000',
        opacity: 0.08,
    },
} as const;

// ========================================
// SPACING (8pt Grid System)
// ========================================

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
    huge: 48,
} as const;

// ========================================
// RADIUS (Corner rounding)
// ========================================

export const Radius = {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 22, // Major cards (Apple-style super-ellipse simulation)
    pill: 999, // Fully rounded (progress rings, badges)
} as const;

// ========================================
// SHADOWS
// ========================================

export const Shadows = {
    card: {
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: Colors.shadow.opacity,
        shadowRadius: 8,
        elevation: 4, // Android
    },
    hero: {
        shadowColor: Colors.shadow.color,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
    },
} as const;

// ========================================
// ANIMATION TIMINGS
// ========================================

export const Timing = {
    fast: 200,
    base: 300,
    slow: 500,
    verySlow: 800,
} as const;
