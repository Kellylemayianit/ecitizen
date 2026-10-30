import { Tabs } from 'expo-router';
import { colors } from '../../src/core/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.green, headerStyle: { backgroundColor: colors.ground }, headerShadowVisible: false, headerTitleStyle: { color: colors.text } }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="vault" options={{ title: 'Vault' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
