import { Pressable, Text } from 'react-native';
import { radius, useColors } from '../core/theme';

type Props = { label: string; onPress: () => void; variant?: 'primary' | 'outline' | 'gold'; disabled?: boolean };

export function Button({ label, onPress, variant = 'primary', disabled }: Props) {
  const c = useColors();
  const bg = variant === 'primary' ? c.green : variant === 'gold' ? c.gold : c.card;
  const fg = variant === 'primary' ? c.onGreen : variant === 'gold' ? c.onGold : c.link;
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={{ minHeight: 52, borderRadius: radius.md, backgroundColor: bg, opacity: disabled ? 0.5 : 1,
        borderWidth: variant === 'outline' ? 1 : 0, borderColor: c.link,
        alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
      <Text style={{ color: fg, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}
