'use client';

import Image from 'next/image';
import { useThemeContext } from '@/contexts/theme-context';

export default function DarkModeToggle() {
    const { theme, setTheme } = useThemeContext();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md border font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition"
        >
            <Image
                height={50}
                width={50}
                src={theme === 'dark' ? "/images/sun.png" : "/images/moon.png" }
                alt={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                className="w-6 h-6"
            />
        </button>
    )
}
