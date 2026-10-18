import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { useThemeMode, type ThemeMode } from '../../src/core/theme';
import { useAuth } from '../../src/features/auth/store';
import { Button, Card, Muted, Row, Screen } from '../../src/ui';

const modes: { key: ThemeMode; label: string }[] = [{ key: 'system', label: 'System' }, { key: 'light', label: 'Light' }, { key: 'dark', label: 'Dark' }];

export default function Profile() {
  const router = useRouter();
  const { contact, idVerified, lock, signOut } = useAuth();
  const { mode, setMode } = useThemeMode();
  return (
    <Screen>
      <Card>
        <Row a="Signed in as" b={contact ?? ''} />
        <Row a="Identity" b={idVerified ? 'Verified' : 'Not verified yet'} />
      </Card>
      <Card>
        <Muted>Appearance</Muted>
        {modes.map((m) => <Button key={m.key} label={m.label} variant={mode === m.key ? 'primary' : 'outline'} onPress={() => setMode(m.key)} />)}
      </Card>
      {!idVerified && <Button label="Verify your ID" onPress={() => router.push('/verify-id' as never)} />}
      <Button label="Lock app" variant="outline" onPress={lock} />
      <Button label="Sign out" variant="outline" onPress={signOut} />
      <Muted>Mandhari is not a government app. It helps you use official services.</Muted>
    </Screen>
  );
}
