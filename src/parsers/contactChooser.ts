// File: src/parsers/contactChooser.ts
import type { Contact } from '../types';

// Chooses the best contact based on role/email patterns
export function chooseBestContact(contacts: Contact[]): Contact | null {
  const priorityPatterns = [
    /events/i,
    /bookings/i,
    /sales/i,
    /info/i,
    /contact/i
  ];

  for (const pattern of priorityPatterns) {
    const match = contacts.find(
      (c) =>
        (c.role && pattern.test(c.role)) ||
        (c.email && pattern.test(c.email))
    );
    if (match) return match;
  }

  return contacts[0] || null;
}
