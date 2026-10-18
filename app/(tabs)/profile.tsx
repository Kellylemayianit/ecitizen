import { useRouter } from 'expo-router';
import { useAuth } from '../../src/features/auth/store';
import { Button, Card, Muted, Row, Screen } from '../../src/ui';

export default function Profile() {
  const router = useRouter();
  const { contact, idVerified, lock, signOut } = useAuth();
  return (
    <Screen>
      <Card>
        <Row a="Signed in as" b={contact ?? ''} />
        <Row a="Identity" b={idVerified ? 'Verified' : 'Not verified yet'} />
      </Card>
      {!idVerified && <Button label="Verify your ID" onPress={() => router.push('/verify-id' as never)} />}
      <Button label="Lock app" variant="outline" onPress={lock} />
      <Button label="Sign out" variant="outline" onPress={signOut} />
      <Muted>Mandhari is not a government app. It helps you use official services.</Muted>
    </Screen>
  );
}
