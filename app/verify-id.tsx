import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../src/features/auth/store';
import { Button, Field, H1, Muted, Screen } from '../src/ui';

export default function VerifyId() {
  const verifyId = useAuth((s) => s.verifyId);
  const router = useRouter();
  const [id, setId] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    setBusy(true); const ok = await verifyId(id.trim()); setBusy(false);
    if (ok) router.back(); else Alert.alert('We could not verify that ID', 'Check the number and try again.');
  };
  return (
    <Screen>
      <H1>Verify your identity</H1>
      <Muted>We check your National ID once, so Mandhari can act for you on services that need it. You will not be asked again.</Muted>
      <Field label="National ID number" value={id} onChangeText={setId} keyboardType="number-pad" maxLength={8} />
      <Button label="Verify" onPress={submit} disabled={busy || id.length < 7} />
    </Screen>
  );
}
