'use client'

import React, {createContext, useContext, useState, useEffect} from 'react';

type ThemeContextProviderProps = {
    children: React.ReactNode;
}

type Theme = 'light' | 'dark';

type ThemeContext = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({children}: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            setTheme('dark' as Theme);
            localStorage.setItem('theme', 'dark' as Theme)
        }
    }, []);

    useEffect(() => {
        if (theme) {
            localStorage.setItem('theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }, [theme]);

    if (!theme) return null;
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: setTheme as React.Dispatch<React.SetStateAction<Theme>>
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