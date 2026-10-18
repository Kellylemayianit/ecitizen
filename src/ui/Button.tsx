import { Pressable, Text } from 'react-native';
import { colors, radius } from '../core/theme';

type Props = { label: string; onPress: () => void; variant?: 'primary' | 'outline' | 'gold'; disabled?: boolean };

export function Button({ label, onPress, variant = 'primary', disabled }: Props) {
  const bg = variant === 'primary' ? colors.green : variant === 'gold' ? colors.gold : colors.card;
  const fg = variant === 'primary' ? '#fff' : variant === 'gold' ? colors.text : colors.green;
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={{ minHeight: 52, borderRadius: radius.md, backgroundColor: bg, opacity: disabled ? 0.5 : 1,
        borderWidth: variant === 'outline' ? 1 : 0, borderColor: colors.green,
        alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
      <Text style={{ color: fg, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}
