import { Actor } from 'apify';
import { createCrawler } from './crawler';

await Actor.init();

const input = await Actor.getInput<ActorInput>();
if (!input || !input.startUrls?.length) throw new Error('Missing startUrls');

const crawler = createCrawler(input);
await crawler.run(input.startUrls);

await Actor.exit();
