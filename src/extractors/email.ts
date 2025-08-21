// File: src/extractors/email.ts

/**
 * Extracts all email addresses from the HTML/text content.
 * Filters out common unwanted patterns (e.g., noreply).
 * Returns a unique list of emails.
 */

export function extractEmails(html: string): string[] {
  // Basic email regex – supports most common formats
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  const matches = html.match(emailRegex) || [];

  // Normalize + deduplicate
  const unique = new Set<string>();

  for (const email of matches) {
    const normalized = email.trim().toLowerCase();

    // Exclude generic or automated addresses
    if (
      normalized.startsWith('noreply') ||
      normalized.startsWith('no-reply') ||
      normalized.includes('@example.') ||
      normalized.includes('donotreply')
    ) {
      continue;
    }

    unique.add(normalized);
  }

  return Array.from(unique);
}
/*
🔮 TO DO (Optional Future Enhancements):

✅ Prioritize personal or role-based emails (sally@domain.com vs info@domain.com) using scoring logic.

🧠 Return email + page location (e.g., header/footer/contact) for better message strategy.

📊 Track domain frequencies (e.g., multiple emails from same domain = business email confidence).

🔗 Also extract from mailto: links, even if not in plain text.

🔍 Use GPT fallback if no email found and text mentions "email us" or "contact" without revealing the actual email.

⚠️ Add config-based filter: allow info@ if no better email is found.
*/
