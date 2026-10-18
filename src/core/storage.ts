import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
// Native: OS keychain/keystore. Web: localStorage (not secure; fine for MVP only).
export const secure = {
  get: async (k: string) => (Platform.OS === 'web' ? localStorage.getItem(k) : SecureStore.getItemAsync(k)),
  set: async (k: string, v: string) => (Platform.OS === 'web' ? localStorage.setItem(k, v) : SecureStore.setItemAsync(k, v)),
  del: async (k: string) => (Platform.OS === 'web' ? localStorage.removeItem(k) : SecureStore.deleteItemAsync(k)),
};
