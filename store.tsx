import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cities, City } from './constants/Cities';
import { Language } from './constants/Strings';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ReminderRule {
    id: string;
    tithiIndex: number;
    daysOffset: number; // 0 = Today, 1 = Day before, 7 = Week before
    hour: number;
    minute: number;
}

interface AppState {
    currentLanguage: Language;
    selectedCity: City;
    themeMode: ThemeMode;
    reminderRules: ReminderRule[];
    remindersEnabled: boolean;
    setLanguage: (lang: Language) => void;
    setCity: (city: City) => void;
    setThemeMode: (mode: ThemeMode) => void;
    addReminderRule: (rule: ReminderRule) => void;
    updateReminderRule: (id: string, updatedRule: Omit<ReminderRule, 'id'>) => void;
    removeReminderRule: (id: string) => void;
    setRemindersEnabled: (enabled: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [currentLanguage, setLanguageState] = useState<Language>('en');
    const [selectedCity, setCityState] = useState<City>(Cities[0]);
    const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
    const [reminderRules, setReminderRulesState] = useState<ReminderRule[]>([]);
    const [remindersEnabled, setRemindersEnabledState] = useState<boolean>(false);

    // Initial Load
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const storedRules = await AsyncStorage.getItem('@reminder_rules');
                const storedEnabled = await AsyncStorage.getItem('@reminders_enabled');
                if (storedRules) setReminderRulesState(JSON.parse(storedRules));
                if (storedEnabled) setRemindersEnabledState(JSON.parse(storedEnabled));
                
                // Load other settings if needed
                const storedLang = await AsyncStorage.getItem('@app_lang');
                if (storedLang) setLanguageState(storedLang as Language);
                
                const storedTheme = await AsyncStorage.getItem('@app_theme');
                if (storedTheme) setThemeModeState(storedTheme as ThemeMode);

                const storedCity = await AsyncStorage.getItem('@app_city');
                if (storedCity) {
                    const parsedCity = JSON.parse(storedCity);
                    const foundCity = Cities.find(c => c.name === parsedCity.name);
                    if (foundCity) setCityState(foundCity);
                }
            } catch (error) {
                console.error("Error loading stored data", error);
            }
        };
        loadInitialData();
    }, []);

    // Setters that also persist to storage
    const addReminderRule = async (rule: ReminderRule) => {
        // Prevent duplicate rules: same tithi + offset + time = same notification
        const isDuplicate = reminderRules.some(
            r => r.tithiIndex === rule.tithiIndex &&
                 r.daysOffset === rule.daysOffset &&
                 r.hour       === rule.hour &&
                 r.minute     === rule.minute
        );
        if (isDuplicate) return; // silently ignore

        const newRules = [...reminderRules, rule];
        setReminderRulesState(newRules);
        await AsyncStorage.setItem('@reminder_rules', JSON.stringify(newRules));
    };

    const updateReminderRule = async (id: string, updatedRule: Omit<ReminderRule, 'id'>) => {
        const isDuplicate = reminderRules.some(
            r => r.id !== id && 
                 r.tithiIndex === updatedRule.tithiIndex &&
                 r.daysOffset === updatedRule.daysOffset &&
                 r.hour       === updatedRule.hour &&
                 r.minute     === updatedRule.minute
        );
        if (isDuplicate) return;

        const newRules = reminderRules.map(r => r.id === id ? { ...updatedRule, id } : r);
        setReminderRulesState(newRules);
        await AsyncStorage.setItem('@reminder_rules', JSON.stringify(newRules));
    };

    const removeReminderRule = async (id: string) => {
        const newRules = reminderRules.filter(r => r.id !== id);
        setReminderRulesState(newRules);
        await AsyncStorage.setItem('@reminder_rules', JSON.stringify(newRules));
    };

    const setRemindersEnabled = async (enabled: boolean) => {
        setRemindersEnabledState(enabled);
        await AsyncStorage.setItem('@reminders_enabled', JSON.stringify(enabled));
    };

    const setLanguage = async (lang: Language) => {
        setLanguageState(lang);
        await AsyncStorage.setItem('@app_lang', lang);
    };

    const setCity = async (city: City) => {
        setCityState(city);
        await AsyncStorage.setItem('@app_city', JSON.stringify(city));
    };

    const setThemeMode = async (mode: ThemeMode) => {
        setThemeModeState(mode);
        await AsyncStorage.setItem('@app_theme', mode);
    };

    return (
        <AppContext.Provider value={{
            currentLanguage,
            selectedCity,
            themeMode,
            reminderRules,
            remindersEnabled,
            setLanguage,
            setCity,
            setThemeMode,
            addReminderRule,
            updateReminderRule,
            removeReminderRule,
            setRemindersEnabled
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppStore = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppStore must be used within an AppProvider");
    }
    return context;
};
