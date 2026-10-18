import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../src/features/auth/store';
import { Button, Field, H1, Screen } from '../src/ui';

export default function Unlock() {
  const { unlock, signOut } = useAuth();
  const [pin, setPin] = useState('');
  const submit = async () => { if (!(await unlock(pin))) { setPin(''); Alert.alert('Wrong PIN'); } };
  return (
    <Screen>
      <H1>Enter your PIN</H1>
      <Field label="PIN" value={pin} onChangeText={setPin} keyboardType="number-pad" secureTextEntry maxLength={4} />
      <Button label="Unlock" onPress={submit} disabled={pin.length < 4} />
      <Button label="Forgot PIN? Sign out" variant="outline" onPress={signOut} />
    </Screen>
  );
}
