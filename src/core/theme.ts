import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, useColorScheme, useWindowDimensions } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const light = {
  green: '#0E3B2E', onGreen: '#FFFFFF', link: '#0E3B2E', gold: '#F2B632', onGold: '#10231C',
  ground: '#F4F6F2', card: '#FFFFFF', border: '#E2E7E1', inputBorder: '#CBD3CC',
  text: '#10231C', muted: '#5B6B63', tint: '#E3EFE8', outer: '#E4E9E3', sidebar: '#0E3B2E',
};
export type Palette = { [K in keyof typeof light]: string };
const dark: Palette = {
  green: '#2E7D5E', onGreen: '#FFFFFF', link: '#7FD1AE', gold: '#F2B632', onGold: '#10231C',
  ground: '#0B1511', card: '#13211B', border: '#23342C', inputBorder: '#34483E',
  text: '#E8F0EB', muted: '#9DB0A5', tint: '#1B3A2E', outer: '#070D0A', sidebar: '#0F1F18',
};

export type ThemeMode = 'system' | 'light' | 'dark';
export const useThemeMode = create<{ mode: ThemeMode; setMode: (m: ThemeMode) => void }>()(persist(
  (set) => ({ mode: 'system', setMode: (mode) => set({ mode }) }),
  { name: 'mandhari-theme', storage: createJSONStorage(() => AsyncStorage) },
));

export function useScheme(): 'light' | 'dark' {
  const system = useColorScheme();
  const mode = useThemeMode((s) => s.mode);
  return mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
}
export const useColors = (): Palette => (useScheme() === 'dark' ? dark : (light as Palette));

export const radius = { sm: 12, md: 16, lg: 20 } as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 } as const;

// Desktop web layout (sidebar) kicks in at 1024px wide.
export function useIsWide() {
  const { width } = useWindowDimensions();
  return Platform.OS === 'web' && width >= 1024;
}
