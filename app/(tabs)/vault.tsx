import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useColors } from '../../src/core/theme';
import { statusLabel, useJobs } from '../../src/features/jobs/store';
import { Card, Chip, Muted, Screen } from '../../src/ui';

export default function Vault() {
  const colors = useColors();
  const router = useRouter();
  const jobs = useJobs((s) => s.jobs);
  return (
    <Screen>
      {jobs.length === 0 && <Muted>Your requests, references and receipts will appear here.</Muted>}
      {jobs.map((j) => (
        <Pressable key={j.id} onPress={() => router.push((j.status === 'awaiting_payment' ? `/pay/${j.id}` : `/job/${j.id}`) as never)}>
          <Card>
            <Text style={{ fontWeight: '700', color: colors.text }}>{j.title}</Text>
            <Muted>Reference: {j.reference}</Muted>
            <Chip text={statusLabel[j.status]} />
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
