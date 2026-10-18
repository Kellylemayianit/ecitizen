import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { radius, useColors, useIsWide } from '../../src/core/theme';
import { statusLabel, useJobs } from '../../src/features/jobs/store';
import { catalog } from '../../src/features/services/catalog';
import { Button, Card, Chip, Field, H1, Muted, Screen } from '../../src/ui';

export default function Home() {
  const colors = useColors();
  const wide = useIsWide();
  const router = useRouter();
  const [q, setQ] = useState('');
  const jobs = useJobs((s) => s.jobs);
  const active = jobs.find((j) => j.status !== 'completed');
  const list = catalog.filter((s) => (s.title + s.subtitle).toLowerCase().includes(q.toLowerCase()));
  const open = (j: { id: string; status: string }) => router.push((j.status === 'awaiting_payment' ? `/pay/${j.id}` : `/job/${j.id}`) as never);
  return (
    <Screen>
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 28, alignItems: 'flex-start' }}>
        <View style={wide ? { flex: 1, gap: 16 } : { gap: 16, alignSelf: 'stretch' }}>
          <View><Muted>Habari</Muted><H1>What do you need today?</H1></View>
          <Field label="Search services" value={q} onChangeText={setQ} placeholder="e.g. PIN check" />
          {active && (
            <Card>
              <Muted>In progress</Muted>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{active.title}</Text>
              <Chip text={statusLabel[active.status]} />
              <Button label="Continue" onPress={() => open(active)} />
            </Card>
          )}
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>Services</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {list.map((s) => (
              <Pressable key={s.id} accessibilityRole="button" onPress={() => router.push(`/service/${s.id}` as never)}
                style={{ width: wide ? '31%' : '47%', minHeight: 96, padding: 14, borderRadius: radius.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, gap: 4 }}>
                <Text style={{ fontWeight: '700', color: colors.text }}>{s.title}</Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>{s.subtitle}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        {wide && (
          <View style={{ width: 320 }}>
            <Card>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>Recent activity</Text>
              {jobs.length === 0 && <Muted>Your requests will appear here.</Muted>}
              {jobs.slice(0, 4).map((j) => (
                <Pressable key={j.id} onPress={() => open(j)} style={{ gap: 6, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12 }}>
                  <Text style={{ fontWeight: '700', color: colors.text }}>{j.title}</Text>
                  <Chip text={statusLabel[j.status]} />
                </Pressable>
              ))}
            </Card>
          </View>
        )}
      </View>
    </Screen>
  );
}
