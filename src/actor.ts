// File: src/actor.ts

import { Actor } from 'apify';
import { createCrawler } from './crawler';

await Actor.init();

const input = await Actor.getInput();
if (!input || !input.startUrls?.length || !input.mode) {
    throw new Error('Missing startUrls or mode');
}

const crawler = createCrawler(input);
await crawler.run(input.startUrls);

await Actor.exit();
