// File: src/parsers/contactChooser.ts
import type { Contact } from '../utils/types';

export function chooseBestContact(contacts: Contact[]): Contact | null {
  if (!contacts?.length) return null;
  const priorityPatterns = [/events/i, /bookings/i, /sales/i, /info/i, /contact/i, /groups/i, /catering/i];

  for (const pattern of priorityPatterns) {
    const match = contacts.find((c) => pattern.test(c.role ?? '') || pattern.test(c.email ?? ''));
    if (match) return match;
  }
  return contacts[0] ?? null;
}
