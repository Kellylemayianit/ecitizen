import { Tabs } from 'expo-router';
import { useColors, useIsWide } from '../../src/core/theme';

export default function TabsLayout() {
  const c = useColors();
  const wide = useIsWide();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: c.link, tabBarInactiveTintColor: c.muted,
      tabBarStyle: wide ? { display: 'none' } : { backgroundColor: c.card, borderTopColor: c.border },
      headerStyle: { backgroundColor: c.ground }, headerShadowVisible: false, headerTitleStyle: { color: c.text } }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="vault" options={{ title: 'Vault' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
