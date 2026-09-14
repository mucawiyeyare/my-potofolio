import { useState, useEffect } from 'react';
import { THEME_CONFIG } from '../utils/constants';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem(THEME_CONFIG.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldUseDark);
    updateTheme(shouldUseDark);
  }, []);

  const updateTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
    localStorage.setItem(THEME_CONFIG.storageKey, newTheme ? 'dark' : 'light');
  };

  const setTheme = (theme) => {
    const dark = theme === 'dark';
    setIsDark(dark);
    updateTheme(dark);
    localStorage.setItem(THEME_CONFIG.storageKey, theme);
  };

  return {
    isDark,
    toggleTheme,
    setTheme,
    theme: isDark ? 'dark' : 'light',
  };
};