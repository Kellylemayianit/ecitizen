import type { ServiceAdapter, ServiceDef } from './types';
import { delay } from '../config';

export function getAdapter(def: ServiceDef): ServiceAdapter {
  if (def.mode === 'assisted') {
    return { mode: 'assisted', async execute() {
      return { status: 'handoff', portalUrl: def.portalUrl ?? '', steps: ['Open the official portal', 'Log in and submit your request', 'Come back with your reference number'] };
    } };
  }
  if (def.mode === 'live') {
    return { mode: 'live', async execute() { throw new Error('Live adapter not connected yet'); } }; // calls the Rust BFF
  }
  return { mode: 'mock', async execute(req) {
    await delay(500);
    return { status: 'done', data: { Service: def.title, Query: Object.values(req.input).join(', ') || 'n/a', Result: 'Demo data. Connect the live API to see real results.' } };
  } };
}
export * from './types';
