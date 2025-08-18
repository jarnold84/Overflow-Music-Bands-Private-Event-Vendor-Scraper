// Dummy function for extracting address (can be replaced with proper address parser)
export function extractAddress(html: string): string | null {
    const addressRegex = /\d{1,5}\s\w+(\s\w+)*,?\s\w+(,\s\w+)?/;
    const match = html.match(addressRegex);
    return match ? match[0] : null;
}
