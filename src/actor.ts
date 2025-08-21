// src/actor.ts
import { Actor } from 'apify';
import { createCrawler } from './crawler.js';
import type { ActorInput } from './utils/types.js';

await Actor.init();

const input = await Actor.getInput<ActorInput>();
if (!input || !input.startUrls?.length || !input.mode) {
  throw new Error('❌ Missing required input: startUrls or mode');
}

console.log(`🚀 Starting crawler in ${input.mode} mode with ${input.startUrls.length} URLs`);

const crawler = await createCrawler(input);   // <- await
await crawler.run(input.startUrls);

await Actor.exit();
