import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, radius } from '../../src/core/theme';
import { statusLabel, useJobs } from '../../src/features/jobs/store';
import { catalog } from '../../src/features/services/catalog';
import { Button, Card, Chip, Field, H1, Muted, Screen } from '../../src/ui';

export default function Home() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const active = useJobs((s) => s.jobs.find((j) => j.status !== 'completed'));
  const list = catalog.filter((s) => (s.title + s.subtitle).toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen>
      <View><Muted>Habari</Muted><H1>What do you need today?</H1></View>
      <Field label="Search services" value={q} onChangeText={setQ} placeholder="e.g. PIN check" />
      {active && (
        <Card>
          <Muted>In progress</Muted>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{active.title}</Text>
          <Chip text={statusLabel[active.status]} />
          <Button label="Continue" onPress={() => router.push((active.status === 'awaiting_payment' ? `/pay/${active.id}` : `/job/${active.id}`) as never)} />
        </Card>
      )}
      <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>Services</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {list.map((s) => (
          <Pressable key={s.id} accessibilityRole="button" onPress={() => router.push(`/service/${s.id}` as never)}
            style={{ width: '47%', minHeight: 96, padding: 14, borderRadius: radius.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, gap: 4 }}>
            <Text style={{ fontWeight: '700', color: colors.text }}>{s.title}</Text>
            <Text style={{ fontSize: 12, color: colors.muted }}>{s.subtitle}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
