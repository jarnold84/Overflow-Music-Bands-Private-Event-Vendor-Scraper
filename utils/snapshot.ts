// File: src/utils/snapshot.ts

import { Page } from 'playwright';

export interface PageSnapshot {
    url: string;
    title: string;
    html: string;
    text?: string;
}

export async function buildSnapshot(page: Page, url: string): Promise<PageSnapshot> {
    const html = await page.content();
    const title = await page.title();
    const text = await page.evaluate(() => document.body?.innerText || '');

    return {
        url,
        title,
        html,
        text,
    };
}
