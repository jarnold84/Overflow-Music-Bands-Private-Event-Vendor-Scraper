// File: src/routeHandlers/about.ts

import { buildSnapshot } from '../utils/snapshot';
import { runExtractors } from '../extractors/runExtractors';
import { persistAndPush } from '../output';
import { stopRulesMet } from '../stopRules';
import type { DomainContext, CampaignMode } from '../utils/types';

export async function handleContact(
  ctx: any,
  context: DomainContext,
  mode: CampaignMode
): Promise<void> {
  const { page, request } = ctx;
  const url = request.url;

  const snapshot = await buildSnapshot(page, url);
  await runExtractors(snapshot, context, mode);

  if (stopRulesMet(context)) {
    await persistAndPush(context, {});
  }
}
