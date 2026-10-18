import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../src/features/auth/store';
import { Button, Field, H1, Muted, Screen } from '../src/ui';

export default function SetPin() {
  const setPin = useAuth((s) => s.setPin);
  const [pin, setP] = useState('');
  const [again, setAgain] = useState('');
  const submit = async () => {
    if (!/^\d{4}$/.test(pin)) return Alert.alert('Use a 4-digit PIN');
    if (pin !== again) return Alert.alert('The PINs do not match');
    await setPin(pin);
  };
  return (
    <Screen>
      <H1>Set your PIN</H1>
      <Muted>You will use this PIN to open Mandhari on this device.</Muted>
      <Field label="PIN" value={pin} onChangeText={setP} keyboardType="number-pad" secureTextEntry maxLength={4} />
      <Field label="Confirm PIN" value={again} onChangeText={setAgain} keyboardType="number-pad" secureTextEntry maxLength={4} />
      <Button label="Save PIN" onPress={submit} />
    </Screen>
  );
}
