// Extracts phone numbers from visible content
export function extractPhones(html: string): string[] {
    const phoneRegex = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    return [...new Set(html.match(phoneRegex) || [])];
}
