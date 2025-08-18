// Chooses best email from a list of candidates
export function chooseBestEmail(emails: string[]): string | null {
    const priorityPatterns = [
        /^events@/,
        /^bookings@/,
        /^info@/,
        /^contact@/,
        /sales/,
    ];

    for (const pattern of priorityPatterns) {
        const match = emails.find(email => pattern.test(email));
        if (match) return match;
    }

    return emails[0] || null;
}
