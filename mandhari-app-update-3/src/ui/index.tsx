import { ReactNode } from 'react';
import { ScrollView, Text, TextInput, TextInputProps, View } from 'react-native';
import { radius, useColors, useIsWide } from '../core/theme';
export { Button } from './Button';

export function Screen({ children }: { children: ReactNode }) {
  const c = useColors();
  const wide = useIsWide();
  return <ScrollView style={{ flex: 1, backgroundColor: c.ground }} contentContainerStyle={{ padding: wide ? 40 : 20, gap: 16, width: '100%', maxWidth: wide ? 1000 : undefined, alignSelf: 'center' }} keyboardShouldPersistTaps="handled">{children}</ScrollView>;
}
export function H1({ children }: { children: ReactNode }) {
  const c = useColors();
  return <Text style={{ fontSize: 24, fontWeight: '700', color: c.text }}>{children}</Text>;
}
export function Muted({ children }: { children: ReactNode }) {
  const c = useColors();
  return <Text style={{ fontSize: 14, lineHeight: 20, color: c.muted }}>{children}</Text>;
}
export function Row({ a, b }: { a: string; b: string }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
      <Text style={{ color: c.text }}>{a}</Text>
      <Text style={{ fontWeight: '700', color: c.text, flexShrink: 1, textAlign: 'right' }}>{b}</Text>
    </View>
  );
}
export function Card({ children }: { children: ReactNode }) {
  const c = useColors();
  return <View style={{ backgroundColor: c.card, borderWidth: 1, borderColor: c.border, borderRadius: radius.lg, padding: 16, gap: 10 }}>{children}</View>;
}
export function Chip({ text }: { text: string }) {
  const c = useColors();
  return (
    <View style={{ alignSelf: 'flex-start', backgroundColor: c.gold, borderRadius: 99, paddingVertical: 4, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 12, fontWeight: '700', color: c.onGold }}>{text}</Text>
    </View>
  );
}
export function Field({ label, ...p }: { label: string } & TextInputProps) {
  const c = useColors();
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 12, color: c.muted }}>{label}</Text>
      <TextInput accessibilityLabel={label} placeholderTextColor={c.muted} {...p}
        style={{ height: 48, borderRadius: radius.sm, borderWidth: 1, borderColor: c.inputBorder, backgroundColor: c.card, paddingHorizontal: 14, color: c.text }} />
    </View>
  );
}
