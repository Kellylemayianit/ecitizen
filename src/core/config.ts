export const MANDHARI_FEE = 50; // KSh, convenience fee (your plan: 50 to 100)
export const DEMO_OTP = '123456'; // MOCK: replaced by the backend OTP service
const PAYBILLS: Record<string, string> = {}; // serviceId -> agency paybill. Fill in from the agency.
export const paybillFor = (serviceId: string) => PAYBILLS[serviceId] ?? '[Paybill]';
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
