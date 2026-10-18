import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../src/features/auth/store';
import { Button, Field, H1, Muted, Screen } from '../src/ui';

export default function SignIn() {
  const { requestOtp, verifyOtp, contact } = useAuth();
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const send = async () => {
    if (value.trim().length < 5) return Alert.alert('Enter your WhatsApp number or email');
    setBusy(true); await requestOtp(value.trim()); setBusy(false); setSent(true);
  };
  const verify = async () => {
    setBusy(true); const ok = await verifyOtp(code.trim()); setBusy(false);
    if (!ok) Alert.alert('That code is not right', 'Check it and try again.');
  };
  return (
    <Screen>
      <H1>Welcome to Mandhari</H1>
      <Muted>One place for your government services. Sign in with a code sent to WhatsApp or email.</Muted>
      {!sent ? (<>
        <Field label="WhatsApp number or email" value={value} onChangeText={setValue} autoCapitalize="none" keyboardType="email-address" />
        <Button label="Send code" onPress={send} disabled={busy} />
      </>) : (<>
        <Muted>We sent a code to {contact}. (Demo code: 123456)</Muted>
        <Field label="6-digit code" value={code} onChangeText={setCode} keyboardType="number-pad" maxLength={6} />
        <Button label="Verify" onPress={verify} disabled={busy || code.length < 6} />
        <Button label="Use a different contact" variant="outline" onPress={() => setSent(false)} />
      </>)}
    </Screen>
  );
}
