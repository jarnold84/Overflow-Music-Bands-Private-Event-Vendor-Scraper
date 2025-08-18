// Attempts to extract the vendor or business name from the HTML
export function extractVendorName(html: string): string | null {
    // Try common title patterns
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
        const title = titleMatch[1].trim();
        if (!title.toLowerCase().includes('home')) return title;
    }

    // Try first h1
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
        const h1 = h1Match[1].trim();
        if (h1.length < 100 && h1.length > 2) return h1;
    }

    // Try meta OG:title
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    if (ogTitleMatch) return ogTitleMatch[1].trim();

    return null;
}
