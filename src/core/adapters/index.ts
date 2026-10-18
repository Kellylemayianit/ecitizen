import type { ServiceAdapter, ServiceDef } from './types';
import { delay } from '../config';

export function getAdapter(def: ServiceDef): ServiceAdapter {
  if (def.mode === 'assisted') {
    return { mode: 'assisted', async execute() {
      return { status: 'handoff', portalUrl: def.portalUrl ?? '', steps: ['Open the official portal', 'Log in and submit your request', 'Come back with your reference number'] };
    } };
  }
  if (def.mode === 'live') {
    return { mode: 'live', async execute(req) {
      const base = process.env.EXPO_PUBLIC_API_URL;
      const value = def.input ? req.input[def.input.key] ?? '' : '';
      if (!base) { await delay(500); return { status: 'done', data: { Service: def.title, Result: 'Demo data (EXPO_PUBLIC_API_URL is not set)' } }; }
      const res = await fetch(`${base}${def.endpoint}${encodeURIComponent(value.trim())}`);
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
      return { status: 'done', data: Object.fromEntries(Object.entries(body).map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : v])) };
    } };
  }
  return { mode: 'mock', async execute(req) {
    await delay(500);
    return { status: 'done', data: { Service: def.title, Query: Object.values(req.input).join(', ') || 'n/a', Result: 'Demo data. Connect the live API to see real results.' } };
  } };
}
export * from './types';
