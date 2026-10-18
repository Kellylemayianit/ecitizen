export type AdapterMode = 'mock' | 'assisted' | 'live';
export type ServiceKind = 'query' | 'action';
export type Vertical = 'tax' | 'transport' | 'land' | 'security' | 'health';

export interface ServiceDef {
  id: string; title: string; subtitle: string;
  vertical: Vertical; kind: ServiceKind; mode: AdapterMode;
  portalUrl?: string; endpoint?: string; input?: { key: string; label: string; placeholder: string };
}
export interface ServiceRequest { serviceId: string; input: Record<string, string>; }

export type ServiceResult =
  | { status: 'done'; data: Record<string, unknown> }
  | { status: 'handoff'; portalUrl: string; steps: string[] }
  | { status: 'pending'; reference: string };

export interface ServiceAdapter {
  mode: AdapterMode;
  execute(req: ServiceRequest): Promise<ServiceResult>;
}
