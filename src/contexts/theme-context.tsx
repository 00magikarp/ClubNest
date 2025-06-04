'use client'

import React, {createContext, useContext, useState, useEffect} from 'react';

type ThemeContextProviderProps = {
    children: React.ReactNode;
}

type Theme = 'light' | 'dark' | null;

type ThemeContext = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({children}: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        setTheme(savedTheme ?? 'dark');
    }, []);

    useEffect(() => {
        if (!theme) {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme as Theme);
            } else {
                setTheme('dark' as Theme);
            }
        } else {
            localStorage.setItem('theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }, [theme]);

    if (!theme) return null;
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}>
            {children}
        </ThemeContext.Provider>
    )

}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
};