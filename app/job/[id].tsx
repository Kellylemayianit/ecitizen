import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useColors } from '../../src/core/theme';
import { statusLabel, useJobs, type JobStatus } from '../../src/features/jobs/store';
import { Button, Card, Chip, H1, Muted, Row, Screen } from '../../src/ui';

const steps: JobStatus[] = ['awaiting_payment', 'processing', 'completed'];

export default function JobScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = useJobs((s) => s.jobs.find((j) => j.id === id));
  const patch = useJobs((s) => s.patch);
  if (!job) return <Screen><Muted>Not found</Muted></Screen>;
  const at = steps.indexOf(job.status);
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Status' }} />
      <H1>{job.title}</H1>
      <Chip text={statusLabel[job.status]} />
      <Card>
        <Row a="Reference" b={job.reference} />
        {steps.map((s, i) => (
          <Text key={s} style={{ color: i <= at ? colors.link : colors.muted, fontWeight: i === at ? '700' : '400' }}>
            {i <= at ? '✓ ' : '• '}{statusLabel[s]}
          </Text>
        ))}
      </Card>
      <Muted>{job.status === 'completed' ? 'Your request is complete. Your documents are kept in the Vault.' : 'We will notify you when the agency confirms.'}</Muted>
      {__DEV__ && job.status === 'processing' && <Button label="Dev: simulate agency confirmation" variant="outline" onPress={() => patch(job.id, { status: 'completed' })} />}
    </Screen>
  );
}
