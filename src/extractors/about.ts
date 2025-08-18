export function extractAbout(html: string): string | null {
    const aboutRegex = /about[^<]{0,100}<[^>]*>([^<]{20,500})<\//i;
    const match = html.match(aboutRegex);
    return match ? match[1].trim() : null;
}
