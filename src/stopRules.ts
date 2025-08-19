// File: src/stopRules.ts
import type { DomainContext } from './types.js';
import { chooseBestContact } from './parsers/contactChooser.js';
import { classifyVendor } from './parsers/vendorClassifier.js';

export function recomputeScore(ctx: DomainContext, cfg: any) {
  // Determine vendor type and confidence
  const { vendorType, confidence } = classifyVendor(ctx.signals); // ✅ Fixed: Only pass signals
  ctx.vendorType = vendorType;
  ctx.vendorConfidence = confidence;

  // Choose best contact if available
  if (ctx.contacts) {
    const best = chooseBestContact(ctx.contacts);
    if (best) ctx.bestContact = best;
  }

  // Assign score based on available context
  let score = 0;

  if (ctx.bestContact?.email || ctx.rfpUrl) score += 0.4;
  if (vendorType && confidence > 0.6) score += 0.3;
  if (ctx.services?.length) score += 0.1;
  if (ctx.location?.city || ctx.location?.state) score += 0.1;
  if (ctx.styleVibe?.length || ctx.capacityNotes?.length) score += 0.1;

  ctx.score = Math.min(score, 1);
}

export function shouldStop(ctx: DomainContext, cfg: any): boolean {
  const threshold = cfg?.stopOnScore ?? 0.75;
  return ctx.score >= threshold;
}
