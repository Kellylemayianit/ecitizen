import * as Clipboard from 'expo-clipboard';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { MANDHARI_FEE, delay, paybillFor } from '../../src/core/config';
import { useJobs } from '../../src/features/jobs/store';
import { Button, Card, Chip, Field, H1, Muted, Row, Screen } from '../../src/ui';

export default function Pay() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const job = useJobs((s) => s.jobs.find((j) => j.id === id));
  const patch = useJobs((s) => s.patch);
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  if (!job) return <Screen><Muted>Not found</Muted></Screen>;

  const copy = async () => { await Clipboard.setStringAsync(job.reference); Alert.alert('Copied', 'PRN copied. Paste it as the account number in M-Pesa.'); };
  const payFee = async () => {
    if (phone.length < 9) return Alert.alert('Enter your M-Pesa number');
    setBusy(true); await delay(1500); // MOCK: backend triggers a Daraja STK Push and confirms via callback
    patch(job.id, { feePaid: true }); setBusy(false);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: 'Payment' }} />
      <H1>Pay for your request</H1>
      <Muted>Two payments: one to the agency, one to Mandhari. We never hold the government fee.</Muted>
      <Card>
        <Muted>1. Pay the government</Muted>
        <Row a="Paybill" b={paybillFor(job.serviceId)} />
        <Row a="Account (PRN)" b={job.reference} />
        <Muted>Confirm the exact amount and paybill on the agency portal.</Muted>
        <Button label="Copy PRN" variant="outline" onPress={copy} />
        {job.govPaid ? <Chip text="Marked as paid" /> : <Button label="I have paid the agency" onPress={() => patch(job.id, { govPaid: true })} />}
      </Card>
      <Card>
        <Muted>2. Mandhari fee</Muted>
        <Row a="Convenience fee" b={`KSh ${MANDHARI_FEE}`} />
        {job.feePaid ? <Chip text="Paid" /> : (<>
          <Field label="M-Pesa number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="07XX XXX XXX" />
          <Button label="Pay with M-Pesa" variant="gold" onPress={payFee} disabled={busy} />
        </>)}
      </Card>
      {job.status !== 'awaiting_payment' && <Button label="View status" onPress={() => router.replace(`/job/${job.id}` as never)} />}
    </Screen>
  );
}
