// File: src/stopRules.ts

import type { DomainContext } from './utils/types.js';
import { classifyLead } from './parsers/leadClassifier.js';

export type StopRulesConfig = {
  leadConfidenceThreshold?: number; // default 0.6
  scoreThreshold?: number;         // default 0.6
};

/**
 * Decide if we've scraped enough info to stop.
 * Restores your original 'hasContext' semantics (services truthy, not length),
 * keeps null-safety, and supports configurable thresholds.
 */
export function shouldStop(ctx: DomainContext, cfg: StopRulesConfig = {}): boolean {
  const leadConfidenceThreshold = cfg.leadConfidenceThreshold ?? 0.6;
  const scoreThreshold = cfg.scoreThreshold ?? 0.6;

  const hasContact =
    !!ctx.bestContact?.email || !!ctx.bestContact?.contactPage || !!ctx.bestContact?.rfpUrl;

  const hasLead =
    !!ctx.leadType && (ctx.leadConfidence ?? 0) > leadConfidenceThreshold;

  // ORIGINAL SEMANTICS: treat services as context if present at all
  const hasContext =
    !!(ctx.segmentFocus || ctx.services || ctx.capacityNotes || ctx.location);

  if (hasContact && hasLead && hasContext && (ctx.score ?? 0) > scoreThreshold) {
    ctx.stopReason = 'enough-info';
    return true;
  }
  return false;
}

/**
 * Recalculate score and infer lead type from the most recent text signal.
 * Keeps the classifier-field fix (type -> leadType). Weights match your original.
 */
export function recomputeScore(ctx: DomainContext, cfg: StopRulesConfig = {}): void {
  const leadConfidenceThreshold = cfg.leadConfidenceThreshold ?? 0.6;

  // Classify from latest text
  const lastText = [...ctx.signals].reverse().find((s) => s.text)?.text;
  if (lastText) {
    const { type, confidence } = classifyLead({ url: ctx.seedUrl, html: '', title: '', text: lastText });
    ctx.leadType = type;
    ctx.leadConfidence = confidence;
  }

  // Score (original weights, but null-safe)
  let score = 0;
  if (ctx.bestContact?.email) score += 0.4;
  if (ctx.leadType && (ctx.leadConfidence ?? 0) > leadConfidenceThreshold) score += 0.2;
  if (ctx.segmentFocus) score += 0.1;
  if (ctx.services) score += 0.1; // truthy, not length
  if (ctx.capacityNotes || ctx.location) score += 0.1;
  if (ctx.socialProof || ctx.values) score += 0.1;
  ctx.score = Math.min(score, 1);
}

/** Recompute first, then decide — safer for early-exit. */
export function stopRulesMet(ctx: DomainContext, cfg: StopRulesConfig = {}): boolean {
  recomputeScore(ctx, cfg);
  return shouldStop(ctx, cfg);
}

/*
🔧 TO DO (Future Enhancements):

- Add early stop override: if "stopNow = true" signal is explicitly pushed into context (e.g., GPT says "we're done").
- Adjust scoring weights dynamically based on use case config (e.g., emphasize `location` for venues, `socialProof` for coaches).
- Allow override of required fields (e.g., stop if no email but high-scoring IG + strong context).
- Introduce a "confidence band" — e.g., if score is 0.5–0.6, keep crawling but reduce crawl depth.
- Save and log `stopReason` in output object for analytics.
- (Optional AI fallback): If score < threshold after full crawl, flag as `needs_enrichment = true`.

*/
