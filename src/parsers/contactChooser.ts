// File: src/parsers/contactChooser.ts

import type { Contact } from '../utils/types.js';

/**
 * Attempts to select the "best" contact from a list of contacts
 * by prioritizing known roles or email keywords.
 * Falls back to the first available contact.
 */
export function chooseBestContact(contacts: Contact[]): Contact | null {
  if (!contacts?.length) return null;

  const priorityPatterns = [
    /events/i,
    /bookings?/i,
    /sales/i,
    /info/i,
    /contact/i,
    /groups/i,
    /catering/i,
    /owner/i,
    /director/i,
    /founder/i,
    /producer/i,
    /manager/i,
  ];

  for (const pattern of priorityPatterns) {
    const match = contacts.find(
      (c) => pattern.test(c.role ?? '') || pattern.test(c.email ?? '')
    );
    if (match) return match;
  }

  return contacts[0] ?? null;
}
/*
TO DO (optional future upgrades):
- Add fallback scoring logic (e.g. prioritize personal names over generic inboxes)
- Add support for `contactPage` or `rfpUrl` prioritization if email is missing
- Use GPT or rules to infer role seniority from title (e.g. prioritize Director > Assistant)
- Add fallback by page type signal: About > Contact > Footer
- Optionally return multiple ranked contacts for backup messaging strategies
*/
