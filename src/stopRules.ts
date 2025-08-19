// File: src/stopRules.ts

import type { DomainContext } from './types';

export function recomputeScore(ctx: DomainContext, input: { stopOnScore?: number }) {
    let score = 0;

    if (ctx.bestEmail || ctx.rfpUrl || ctx.contactPage) score += 0.4;

    if (ctx.vendorType) score += 0.2;

    if (ctx.segmentFocus?.length || ctx.services?.length) score += 0.15;

    if (ctx.city && ctx.state) score += 0.1;

    if (ctx.styleVibe?.length || ctx.capacity) score += 0.1;

    if (ctx.socials && Object.keys(ctx.socials).length > 0) score += 0.05;

    // Cap score at 1
    ctx.score = Math.min(score, 1);

    // Store stop reason if over threshold
    const threshold = input.stopOnScore ?? 0.75;
    if (ctx.score >= threshold) {
        ctx.stopReason = `Reached score threshold: ${ctx.score.toFixed(2)}`;
    }
}

export function shouldStop(ctx: DomainContext, input: { stopOnScore?: number }): boolean {
    const threshold = input.stopOnScore ?? 0.75;
    return ctx.score >= threshold;
}
