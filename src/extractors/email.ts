// File: src/extractors/email.ts
export function extractEmails(html: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return [...new Set((html.match(emailRegex) || []).filter(email => !email.startsWith('noreply')))];
}
