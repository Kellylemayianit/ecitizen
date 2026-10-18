import { Redirect, Stack, useSegments } from 'expo-router';
import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { colors } from '../src/core/theme';
import { useAuth, useHydrated } from '../src/features/auth/store';

// On desktop web, keep the app phone-width and centered. Native is unaffected.
function Frame({ children }: { children: ReactNode }) {
  if (Platform.OS !== 'web') return <>{children}</>;
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#E4E9E3' }}>
      <View style={{ flex: 1, width: '100%', maxWidth: 480, backgroundColor: colors.ground }}>{children}</View>
    </View>
  );
}

export default function RootLayout() {
  const { signedIn, hasPin, unlocked } = useAuth();
  const hydrated = useHydrated();
  const first = String(useSegments()[0] ?? '');
  if (!hydrated) return null;

  let target: string | null = null;
  if (!signedIn) { if (first !== 'sign-in') target = '/sign-in'; }
  else if (!hasPin) { if (first !== 'set-pin') target = '/set-pin'; }
  else if (!unlocked) { if (first !== 'unlock') target = '/unlock'; }
  else if (['sign-in', 'set-pin', 'unlock'].includes(first)) target = '/';
  if (target) return <Frame><Redirect href={target as never} /></Frame>;

  return (
    <Frame>
      <Stack screenOptions={{ headerStyle: { backgroundColor: colors.ground }, headerTintColor: colors.green, headerShadowVisible: false, contentStyle: { backgroundColor: colors.ground } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="set-pin" options={{ headerShown: false }} />
        <Stack.Screen name="unlock" options={{ headerShown: false }} />
        <Stack.Screen name="verify-id" options={{ title: 'Verify your ID' }} />
      </Stack>
    </Frame>
  );
}
