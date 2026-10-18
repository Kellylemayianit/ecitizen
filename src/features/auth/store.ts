import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DEMO_OTP, delay } from '../../core/config';
import { secure } from '../../core/storage';

interface Auth {
  contact: string | null; signedIn: boolean; hasPin: boolean; idVerified: boolean; unlocked: boolean;
  requestOtp: (contact: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<boolean>;
  setPin: (pin: string) => Promise<void>;
  unlock: (pin: string) => Promise<boolean>;
  lock: () => void;
  verifyId: (nationalId: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const useAuth = create<Auth>()(persist((set) => ({
  contact: null, signedIn: false, hasPin: false, idVerified: false, unlocked: false,
  requestOtp: async (contact) => { await delay(500); set({ contact }); }, // MOCK: call backend OTP
  verifyOtp: async (code) => { await delay(500); if (code !== DEMO_OTP) return false; set({ signedIn: true }); return true; },
  setPin: async (pin) => { await secure.set('pin', pin); set({ hasPin: true, unlocked: true }); },
  unlock: async (pin) => { const ok = (await secure.get('pin')) === pin; if (ok) set({ unlocked: true }); return ok; },
  lock: () => set({ unlocked: false }),
  verifyId: async (id) => { await delay(700); if (!/^\d{7,8}$/.test(id)) return false; set({ idVerified: true }); return true; }, // MOCK: use a verification provider
  signOut: async () => { await secure.del('pin'); set({ contact: null, signedIn: false, hasPin: false, idVerified: false, unlocked: false }); },
}), {
  name: 'mandhari-auth', storage: createJSONStorage(() => AsyncStorage),
  partialize: (s) => ({ contact: s.contact, signedIn: s.signedIn, hasPin: s.hasPin, idVerified: s.idVerified }),
}));

export function useHydrated() {
  const [h, setH] = useState(useAuth.persist.hasHydrated());
  useEffect(() => useAuth.persist.onFinishHydration(() => setH(true)), []);
  return h;
}
