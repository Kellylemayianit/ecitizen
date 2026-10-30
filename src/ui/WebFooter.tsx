import { Linking, Platform, Pressable, Text, View } from 'react-native';
import { useColors, useIsWide } from '../core/theme';
import { ThemeToggle } from './ThemeToggle';

// Web only: renders nothing on Android and iOS.
// Set EXPO_PUBLIC_SITE_URL to your marketing site (for example https://mandhari.co.ke).
const SITE = process.env.EXPO_PUBLIC_SITE_URL ?? 'https://mandhari.example';
const CREDIT_URL = 'https://lord-kaelen.kaelentechnologies.workers.dev/';
const links = [{ label: 'Help', path: '/#faq' }, { label: 'Privacy', path: '/privacy' }, { label: 'Terms', path: '/terms' }];

export function WebFooter({ stack }: { stack?: boolean }) {
  const c = useColors();
  const wide = useIsWide();
  if (Platform.OS !== 'web') return null;
  const row = wide && !stack;
  const showTheme = !wide || !!stack; // the desktop sidebar has its own switch
  const open = (url: string) => Linking.openURL(url);
  return (
    <View style={{ borderTopWidth: 1, borderTopColor: c.border, paddingVertical: 20, paddingHorizontal: row ? 48 : 20, gap: 12,
      flexDirection: row ? 'row' : 'column', justifyContent: 'space-between', alignItems: row ? 'center' : 'flex-start' }}>
      <Text style={{ fontSize: 12, lineHeight: 18, color: c.muted, maxWidth: 420 }}>Mandhari is an independent app, not run by the Government of Kenya.</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
        {showTheme && <ThemeToggle />}
        {links.map((l) => (
          <Pressable key={l.label} accessibilityRole="link" onPress={() => open(SITE + l.path)} style={{ minHeight: 32, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, color: c.muted }}>{l.label}</Text>
          </Pressable>
        ))}
        <Pressable accessibilityRole="link" onPress={() => open(CREDIT_URL)} style={{ minHeight: 32, justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, color: c.muted }}>Built by <Text style={{ fontWeight: '700', color: c.text }}>Kaelen Technologies</Text></Text>
        </Pressable>
      </View>
    </View>
  );
}
