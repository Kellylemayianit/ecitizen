import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type JobStatus = 'awaiting_payment' | 'processing' | 'completed';
export interface Job { id: string; serviceId: string; title: string; reference: string; status: JobStatus; govPaid: boolean; feePaid: boolean; createdAt: number }
export const statusLabel: Record<JobStatus, string> = { awaiting_payment: 'Awaiting your payment', processing: 'Waiting for the agency', completed: 'Completed' };

interface Jobs {
  jobs: Job[];
  addJob: (j: Pick<Job, 'serviceId' | 'title' | 'reference'>) => string;
  patch: (id: string, p: Partial<Job>) => void;
}

export const useJobs = create<Jobs>()(persist((set) => ({
  jobs: [],
  addJob: (j) => {
    const id = String(Date.now());
    set((s) => ({ jobs: [{ ...j, id, status: 'awaiting_payment', govPaid: false, feePaid: false, createdAt: Date.now() }, ...s.jobs] }));
    return id;
  },
  patch: (id, p) => set((s) => ({ jobs: s.jobs.map((j) => {
    if (j.id !== id) return j;
    const n = { ...j, ...p };
    if (n.status === 'awaiting_payment' && n.govPaid && n.feePaid) n.status = 'processing';
    return n;
  }) })),
}), { name: 'mandhari-jobs', storage: createJSONStorage(() => AsyncStorage) }));
