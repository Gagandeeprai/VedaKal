import { useColorScheme } from 'react-native';
import { Colors } from '../constants/DesignTokens';
import { useAppStore } from '../store';

export const useTheme = () => {
    const { themeMode } = useAppStore();
    const systemColorScheme = useColorScheme();

    // Determine effective theme
    const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');

    // Helper to get themed color
    const getColor = (lightColor: string, darkColor: string) => {
        return isDark ? darkColor : lightColor;
    };

    return {
        isDark,
        colors: {
            background: getColor(Colors.background.light, Colors.background.dark),
            surface: getColor(Colors.surface.light, Colors.surface.dark),
            textPrimary: getColor(Colors.text.primary.light, Colors.text.primary.dark),
            textSecondary: getColor(Colors.text.secondary.light, Colors.text.secondary.dark),
            textTertiary: getColor(Colors.text.tertiary.light, Colors.text.tertiary.dark),
        },
        getColor,
    };
};
