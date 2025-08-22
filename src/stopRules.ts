// File: src/stopRules.ts

import type { DomainContext } from './utils/types.js';
import { classifyLead } from './parsers/leadClassifier.js';

export type StopRulesConfig = {
  leadConfidenceThreshold?: number; // default 0.6
  scoreThreshold?: number;         // default 0.6
};

/**
 * Decide if we've scraped enough info to stop.
 * Requires contact + lead type + some business context.
 */
export function shouldStop(ctx: DomainContext, cfg: StopRulesConfig = {}): boolean {
  const leadConfidenceThreshold = cfg.leadConfidenceThreshold ?? 0.6;
  const scoreThreshold = cfg.scoreThreshold ?? 0.6;

  const hasContact =
    !!ctx.bestContact?.email ||
    !!ctx.bestContact?.contactPage ||
    !!ctx.bestContact?.rfpUrl;

  const hasLead =
    !!ctx.leadType &&
    Array.isArray(ctx.leadTypes) &&
    ctx.leadTypes.length > 0 &&
    (ctx.leadConfidence ?? 0) > leadConfidenceThreshold;

  const hasContext =
    !!(ctx.segmentFocus || ctx.services || ctx.capacityNotes || ctx.location);

  if (hasContact && hasLead && hasContext && (ctx.score ?? 0) > scoreThreshold) {
    ctx.stopReason = 'enough-info';
    return true;
  }

  return false;
}

/**
 * Recalculate score and infer lead types from the most recent text signal.
 * Uses multi-match classifier and sets primary + confidence.
 */
export async function recomputeScore(ctx: DomainContext, cfg: StopRulesConfig = {}): Promise<void> {
  const leadConfidenceThreshold = cfg.leadConfidenceThreshold ?? 0.6;

  const lastText = [...ctx.signals].reverse().find((s) => s.text)?.text;
  if (lastText) {
    const { primary, matches } = await classifyLead({
      url: ctx.seedUrl,
      html: '',
      title: '',
      text: lastText,
    });

    ctx.leadType = primary.leadType;
    ctx.leadTypes = matches.map((m) => m.leadType);
    ctx.leadConfidence = primary.confidence;
  }

  let score = 0;
  if (ctx.bestContact?.email) score += 0.4;
  if (ctx.leadTypes?.length && (ctx.leadConfidence ?? 0) > leadConfidenceThreshold) score += 0.2;
  if (ctx.segmentFocus) score += 0.1;
  if (ctx.services) score += 0.1;
  if (ctx.capacityNotes || ctx.location) score += 0.1;
  if (ctx.socialProof || ctx.values) score += 0.1;

  ctx.score = Math.min(score, 1);
}

/**
 * Master stop-rule: recompute, then decide.
 */
export async function stopRulesMet(
  ctx: DomainContext,
  cfg: StopRulesConfig = {}
): Promise<boolean> {
  await recomputeScore(ctx, cfg);
  return shouldStop(ctx, cfg);
}

/*
🧠 TO DO — Optional Enhancements:

- Add early stop override: `ctx.stopNow = true` if GPT or agent suggests termination.
- Dynamic weighting: Emphasize different fields per lead type or campaign mode.
- Add "confidence band" for soft-stopping: e.g., score 0.5–0.6 triggers shallow crawl.
- Log and analyze `stopReason` for crawl strategy tuning.
- Add `needsEnrichment = true` flag if contact/context is weak post-crawl.
- Route to fallback scraping (form-only, social-only) if score is low.
- Consider routing based on structureMode + lead type (e.g., team-directory + Coach).
*/
