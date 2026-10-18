import { usePathname, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useColors } from '../core/theme';
import { useAuth } from '../features/auth/store';

const items = [{ label: 'Home', href: '/' }, { label: 'Vault', href: '/vault' }, { label: 'Profile', href: '/profile' }];

// Desktop web only (rendered by the root layout at 1024px and wider).
export function Sidebar() {
  const c = useColors();
  const router = useRouter();
  const path = usePathname();
  const lock = useAuth((s) => s.lock);
  return (
    <View style={{ width: 240, backgroundColor: c.sidebar, padding: 20, gap: 8 }}>
      <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 24 }}>Mandhari</Text>
      {items.map((i) => {
        const active = path === i.href;
        return (
          <Pressable key={i.href} accessibilityRole="link" onPress={() => router.push(i.href as never)}
            style={{ padding: 12, borderRadius: 12, backgroundColor: active ? 'rgba(255,255,255,0.14)' : 'transparent' }}>
            <Text style={{ color: active ? '#FFFFFF' : '#B9D8C9', fontWeight: active ? '700' : '400' }}>{i.label}</Text>
          </Pressable>
        );
      })}
      <View style={{ flex: 1 }} />
      <Pressable accessibilityRole="button" onPress={lock} style={{ padding: 12 }}>
        <Text style={{ color: '#B9D8C9' }}>Lock app</Text>
      </Pressable>
    </View>
  );
}
