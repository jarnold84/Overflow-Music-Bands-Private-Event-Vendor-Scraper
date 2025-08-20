// File: src/actor.ts

import { Actor } from 'apify';
import { createCrawler } from './crawler';
import type { ActorInput } from './utils/types';

await Actor.init();

// Get actor input and validate
const input = await Actor.getInput<ActorInput>();
if (!input || !input.startUrls?.length || !input.mode) {
    throw new Error('❌ Missing required input: startUrls or mode');
}

console.log(`🚀 Starting crawler in ${input.mode} mode with ${input.startUrls.length} URLs`);

const crawler = createCrawler(input);
await crawler.run(input.startUrls);

await Actor.exit();
