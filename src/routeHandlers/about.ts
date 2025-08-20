// File: src/routerHandlers/about.ts

import { buildSnapshot } from '../utils/snapshot';
import { runExtractors } from '../extractors/runExtractors';
import type { DomainContext, CampaignMode } from '../utils/types';
import { stopRulesMet } from '../stopRules';
import { persistAndPush } from '../output';

export async function handleAbout(ctx: any, context: DomainContext, mode: CampaignMode) {
  const snapshot = await buildSnapshot(ctx.page, ctx.request.url);
  await runExtractors(snapshot, context, mode);

  if (stopRulesMet(context)) {
    await persistAndPush(context, {});
  }
}
