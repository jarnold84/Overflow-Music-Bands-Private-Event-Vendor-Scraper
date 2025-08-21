import { BLOCKED_DOMAINS, BLOCKED_PATH_SNIPPETS } from '../constants.js';

export function getHostname(u: string): string {
  try { return new URL(u).hostname.replace(/^www\./,''); } catch { return u; }
}

export function sameRegistrableDomain(a: string, b: string): boolean {
  try {
    const ah = new URL(a).hostname.split('.').slice(-2).join('.');
    const bh = new URL(b).hostname.split('.').slice(-2).join('.');
    return ah === bh;
  } catch { return false; }
}

export function shouldBlockUrl(u: string): boolean {
  const l = u.toLowerCase();
  if (BLOCKED_DOMAINS.some(d => l.includes(d))) return true;
  if (BLOCKED_PATH_SNIPPETS.some(s => l.includes(s))) return true;
  return false;
}
