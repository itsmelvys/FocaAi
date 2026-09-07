import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';

import { DarkColors, LightColors } from '@/constants/brand';

const ThemeContext = createContext(null);

export const THEME_OPTIONS = [
  { id: 'light', label: 'Claro' },
  { id: 'dark', label: 'Noturno' },
];

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const colors = mode === 'dark' ? DarkColors : LightColors;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.cream).catch(() => {});
  }, [colors.cream]);

  const value = useMemo(
    () => ({
      mode,
      colors,
      themeLabel: mode === 'dark' ? 'Noturno' : 'Claro',
      setMode,
      setTheme(next) {
        setMode(next === 'dark' ? 'dark' : 'light');
      },
      toggleTheme() {
        setMode((current) => (current === 'dark' ? 'light' : 'dark'));
      },
    }),
    [colors, mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme precisa estar dentro de ThemeProvider');
  }
  return context;
}

export function useThemedStyles(factory) {
  const { colors } = useTheme();
  return useMemo(() => StyleSheet.create(factory(colors)), [colors]);
}
