import { Redirect, Stack, useSegments } from 'expo-router';
import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { useColors, useIsWide } from '../src/core/theme';
import { Sidebar } from '../src/ui/Sidebar';
import { WebFooter } from '../src/ui/WebFooter';
import { Loader } from '../src/ui/Loader';
import { useAuth, useHydrated } from '../src/features/auth/store';

// On desktop web, keep the app phone-width and centered. Native is unaffected.
function Frame({ children, shell }: { children: ReactNode; shell: boolean }) {
  const c = useColors();
  const wide = useIsWide();
  if (Platform.OS !== 'web') return <>{children}</>;
  if (wide && shell) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: c.ground }}>
        <Sidebar />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>{children}</View>
          <WebFooter />
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: c.outer }}>
      <View style={{ flex: 1, width: '100%', maxWidth: 480, backgroundColor: c.ground }}>
        <View style={{ flex: 1 }}>{children}</View>
        {wide && <WebFooter stack />}
      </View>
    </View>
  );
}

export default function RootLayout() {
  const c = useColors();
  const { signedIn, hasPin, unlocked } = useAuth();
  const hydrated = useHydrated();
  const first = String(useSegments()[0] ?? '');
  if (!hydrated) return <Loader fill />;

  let target: string | null = null;
  if (!signedIn) { if (first !== 'sign-in') target = '/sign-in'; }
  else if (!hasPin) { if (first !== 'set-pin') target = '/set-pin'; }
  else if (!unlocked) { if (first !== 'unlock') target = '/unlock'; }
  else if (['sign-in', 'set-pin', 'unlock'].includes(first)) target = '/';
  if (target) return <Frame shell={false}><Redirect href={target as never} /></Frame>;

  return (
    <Frame shell={signedIn && hasPin && unlocked}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: c.ground }, headerTintColor: c.link, headerTitleStyle: { color: c.text }, headerShadowVisible: false, contentStyle: { backgroundColor: c.ground } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="set-pin" options={{ headerShown: false }} />
        <Stack.Screen name="unlock" options={{ headerShown: false }} />
        <Stack.Screen name="verify-id" options={{ title: 'Verify your ID' }} />
      </Stack>
    </Frame>
  );
}
