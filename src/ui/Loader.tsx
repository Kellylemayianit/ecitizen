import { ActivityIndicator, Text, View } from 'react-native';
import { useColors } from '../core/theme';

// fill = full-screen splash; otherwise a small inline loader.
export function Loader({ label, fill }: { label?: string; fill?: boolean }) {
  const c = useColors();
  return (
    <View accessibilityRole="progressbar" accessibilityLabel={label ?? 'Loading'}
      style={fill ? { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, backgroundColor: c.ground } : { alignItems: 'center', padding: 16, gap: 8 }}>
      {fill && <Text style={{ fontSize: 20, fontWeight: '800', color: c.link }}>Mandhari</Text>}
      <ActivityIndicator color={c.link} />
      {label && <Text style={{ fontSize: 12, color: c.muted }}>{label}</Text>}
    </View>
  );
}
