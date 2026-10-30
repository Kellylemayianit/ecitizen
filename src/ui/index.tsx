import { ReactNode } from 'react';
import { ScrollView, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius } from '../core/theme';
export { Button } from './Button';

export const Screen = ({ children }: { children: ReactNode }) => (
  <ScrollView style={{ flex: 1, backgroundColor: colors.ground }} contentContainerStyle={{ padding: 20, gap: 16 }} keyboardShouldPersistTaps="handled">{children}</ScrollView>
);
export const H1 = ({ children }: { children: ReactNode }) => <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text }}>{children}</Text>;
export const Muted = ({ children }: { children: ReactNode }) => <Text style={{ fontSize: 14, lineHeight: 20, color: colors.muted }}>{children}</Text>;
export const Row = ({ a, b }: { a: string; b: string }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
    <Text style={{ color: colors.text }}>{a}</Text><Text style={{ fontWeight: '700', color: colors.text, flexShrink: 1, textAlign: 'right' }}>{b}</Text>
  </View>
);
export const Card = ({ children }: { children: ReactNode }) => (
  <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 16, gap: 10 }}>{children}</View>
);
export const Chip = ({ text }: { text: string }) => (
  <View style={{ alignSelf: 'flex-start', backgroundColor: colors.gold, borderRadius: 99, paddingVertical: 4, paddingHorizontal: 10 }}>
    <Text style={{ fontSize: 12, fontWeight: '700', color: colors.text }}>{text}</Text>
  </View>
);
export function Field({ label, ...p }: { label: string } & TextInputProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 12, color: colors.muted }}>{label}</Text>
      <TextInput accessibilityLabel={label} placeholderTextColor={colors.muted} {...p}
        style={{ height: 48, borderRadius: radius.sm, borderWidth: 1, borderColor: '#CBD3CC', backgroundColor: colors.card, paddingHorizontal: 14, color: colors.text }} />
    </View>
  );
}
