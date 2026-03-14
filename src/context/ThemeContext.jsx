import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use light mode
  const theme = 'light';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Always set light mode
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  // Dummy toggle function to prevent errors in components that might still call it
  const toggleTheme = () => {
    // No-op: theme is always light
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: () => {}, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

