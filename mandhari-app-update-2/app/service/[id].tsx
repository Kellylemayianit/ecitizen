import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, Text } from 'react-native';
import { getAdapter, type ServiceResult } from '../../src/core/adapters';
import { useColors } from '../../src/core/theme';
import { useAuth } from '../../src/features/auth/store';
import { useJobs } from '../../src/features/jobs/store';
import { findService } from '../../src/features/services/catalog';
import { Button, Card, Field, H1, Muted, Row, Screen } from '../../src/ui';

export default function ServiceScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const def = findService(id);
  const router = useRouter();
  const idVerified = useAuth((s) => s.idVerified);
  const addJob = useJobs((s) => s.addJob);
  const [value, setValue] = useState('');
  const [reference, setReference] = useState('');
  const [result, setResult] = useState<ServiceResult | null>(null);
  const [busy, setBusy] = useState(false);
  if (!def) return <Screen><Muted>Service not found</Muted></Screen>;

  const run = async () => {
    setBusy(true);
    try { setResult(await getAdapter(def).execute({ serviceId: def.id, input: def.input ? { [def.input.key]: value } : {} })); }
    catch (e) { Alert.alert('Something went wrong', String(e)); }
    setBusy(false);
  };
  const openPortal = async () => {
    try { await Linking.openURL(def.portalUrl ?? ''); } catch { Alert.alert('Could not open the portal'); }
  };
  const submitRef = () => {
    if (reference.trim().length < 4) return Alert.alert('Enter the reference number from the portal');
    const jobId = addJob({ serviceId: def.id, title: def.title + ': ' + def.subtitle, reference: reference.trim() });
    router.replace(`/pay/${jobId}` as never);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: def.title }} />
      <H1>{def.subtitle}</H1>
      {def.kind === 'query' ? (<>
        {def.input && <Field label={def.input.label} placeholder={def.input.placeholder} value={value} onChangeText={setValue} autoCapitalize="characters" />}
        <Button label="Check" onPress={run} disabled={busy || (!!def.input && value.length < 2)} />
        {result?.status === 'done' && <Card>{Object.entries(result.data).map(([k, v]) => <Row key={k} a={k} b={String(v)} />)}</Card>}
      </>) : !idVerified ? (<>
        <Muted>This service needs a verified identity. You only do this once.</Muted>
        <Button label="Verify your ID" onPress={() => router.push('/verify-id' as never)} />
      </>) : (<>
        <Card>
          <Text style={{ fontWeight: '700', color: colors.text }}>Step 1: Log in on the official portal</Text>
          <Muted>You sign in yourself on the agency site. Mandhari never sees your password. Submit your request there.</Muted>
          <Button label="Open official portal" onPress={openPortal} />
        </Card>
        <Card>
          <Text style={{ fontWeight: '700', color: colors.text }}>Step 2: Come back with your reference</Text>
          <Field label="Reference or PRN from the portal" value={reference} onChangeText={setReference} autoCapitalize="characters" />
          <Button label="Continue to payment" onPress={submitRef} />
        </Card>
      </>)}
    </Screen>
  );
}
