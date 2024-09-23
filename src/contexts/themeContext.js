import React, { createContext, useState, useEffect, useCallback } from 'react';
import theme from '../contants/theme'
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    }, []);

    const currentTheme = isDarkMode ? theme.colors.darkMode : theme.colors.lightMode;

    return (
        <ThemeContext.Provider value={{ currentTheme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
