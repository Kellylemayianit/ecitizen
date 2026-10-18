import { Redirect, Stack, useSegments } from 'expo-router';
import { colors } from '../src/core/theme';
import { useAuth, useHydrated } from '../src/features/auth/store';

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
  if (target) return <Redirect href={target as never} />;

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: colors.ground }, headerTintColor: colors.green, headerShadowVisible: false, contentStyle: { backgroundColor: colors.ground } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="set-pin" options={{ headerShown: false }} />
      <Stack.Screen name="unlock" options={{ headerShown: false }} />
      <Stack.Screen name="verify-id" options={{ title: 'Verify your ID' }} />
    </Stack>
  );
}
