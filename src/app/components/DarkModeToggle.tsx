'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const enabled = saved === 'dark' || (!saved && prefersDark);
        document.documentElement.classList.toggle('dark', enabled);
        setIsDark(enabled);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDark;
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        setIsDark(newMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md border font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition"
        >
            <Image
              height={50}
              width={50}
              src={isDark ? "/images/sun.png" : "/images/moon.png" }
              alt={isDark ? 'Light mode' : 'Dark mode'}
              className="w-6 h-6"
            />
        </button>
    );
};