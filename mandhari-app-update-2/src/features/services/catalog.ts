import type { ServiceDef } from '../../core/adapters';

// Portal URLs: verify each one before release.
export const catalog: ServiceDef[] = [
  { id: 'kra-pin-check', title: 'Tax', subtitle: 'PIN check', vertical: 'tax', kind: 'query', mode: 'live', endpoint: '/v1/kra/pin/',
    input: { key: 'pin', label: 'KRA PIN', placeholder: 'A000000000Z' } },
  { id: 'health-facility', title: 'Health', subtitle: 'Find a facility', vertical: 'health', kind: 'query', mode: 'mock',
    input: { key: 'name', label: 'Facility name', placeholder: 'Search by name' } },
  { id: 'ntsa-license', title: 'Vehicle', subtitle: 'License, logbook', vertical: 'transport', kind: 'action', mode: 'assisted', portalUrl: 'https://www.ecitizen.go.ke' },
  { id: 'lands-search', title: 'Land', subtitle: 'Search, copies', vertical: 'land', kind: 'action', mode: 'assisted', portalUrl: 'https://ardhisasa.lands.go.ke' },
  { id: 'dci-good-conduct', title: 'Police clearance', subtitle: 'Good conduct', vertical: 'security', kind: 'action', mode: 'assisted', portalUrl: 'https://www.ecitizen.go.ke' },
  { id: 'dci-national-id', title: 'National ID', subtitle: 'Apply or replace', vertical: 'security', kind: 'action', mode: 'assisted', portalUrl: 'https://www.ecitizen.go.ke' },
];
export const findService = (id?: string) => catalog.find((s) => s.id === id);
