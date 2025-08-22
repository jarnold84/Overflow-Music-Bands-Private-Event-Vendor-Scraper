// File: src/actor.ts

import { Actor } from 'apify';
import { createCrawler } from './crawler.js';
import type { ActorInput } from './utils/types.js';

await Actor.init();

const input = await Actor.getInput<ActorInput>();

if (!input || !input.startUrls?.length) {
  throw new Error('❌ Missing required input: startUrls');
}

console.log(`🚀 Starting Overflow Universal Lead Scraper`);
console.log(`🧭 Campaign Mode: ${input.campaignMode || 'universal (default)'}`);
console.log(`🌐 URLs to visit: ${input.startUrls.length}`);

const crawler = await createCrawler(input);
await crawler.run(input.startUrls);

await Actor.exit();

/*
TO DO (optional upgrades):
- Accept config from environment variables or default settings (e.g., concurrency, proxies)
- Add dry-run or debug mode to test only 1–2 pages without writing output
- Add progress tracking (pages visited vs total)
- Persist state in KeyValueStore for resume support in long crawls
- Allow URL input via a dataset (Apify best practice for scalability)
- Add support for webhook trigger after run completion (e.g. Slack notification or Make integration)
*/
