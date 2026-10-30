import { Pressable, Text } from 'react-native';
import { useColors, useScheme, useThemeMode } from '../core/theme';

// One-tap light/dark switch. tone="onDark" is for the dark sidebar.
export function ThemeToggle({ tone }: { tone?: 'onDark' }) {
  const c = useColors();
  const scheme = useScheme();
  const setMode = useThemeMode((s) => s.setMode);
  const next = scheme === 'dark' ? 'light' : 'dark';
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Switch to ${next} mode`} onPress={() => setMode(next)}
      style={{ minHeight: tone ? 44 : 32, justifyContent: 'center', padding: tone ? 12 : 0 }}>
      <Text style={{ fontSize: tone ? 14 : 12, color: tone ? '#B9D8C9' : c.muted }}>{scheme === 'dark' ? 'Light mode' : 'Dark mode'}</Text>
    </Pressable>
  );
}
