import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Cities, City } from './constants/Cities';
import { Language } from './constants/Strings';

export type ThemeMode = 'light' | 'dark' | 'system';

interface AppState {
    currentLanguage: Language;
    selectedCity: City;
    themeMode: ThemeMode;
    setLanguage: (lang: Language) => void;
    setCity: (city: City) => void;
    setThemeMode: (mode: ThemeMode) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [currentLanguage, setLanguage] = useState<Language>('en');
    const [selectedCity, setCity] = useState<City>(Cities[0]);
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    return (
        <AppContext.Provider value={{
            currentLanguage,
            selectedCity,
            themeMode,
            setLanguage,
            setCity,
            setThemeMode
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
