// File: src/extractors/runExtractors.ts

import type { DomainContext, ActorInput } from '../utils/types';
import type { PageSnapshot } from '../utils/snapshot';

import { extractEmails } from './email.js';
import { extractPhones } from './phone.js';
import { extractStyleVibe } from './styleVibe.js';
import { extractServices } from './services.js';
import { extractAddress } from './address.js';
import { extractSocials } from './socials.js';
import { extractLeadName } from './leadName.js';
import { extractBusinessName } from './businessName.js';

import { chooseBestContact } from '../parsers/contactChooser.js';
import { normalizeLocation } from '../parsers/locationNorm.js';
import { detectStructureMode } from '../analyzers/detectStructureMode.js';
import { classifyLead } from '../parsers/leadClassifier.js';
import { campaignModeConfigs } from '../configs/campaignModeConfigs.js';

export async function runExtractors(
  snapshot: PageSnapshot,
  ctx: DomainContext,
  _structureMode: string,
  input: ActorInput
): Promise<void> {
  const { html, text } = snapshot;

  // 📌 Attach campaignMode for use by other downstream steps
  ctx.campaignMode = input.campaignMode ?? 'universal';

  // 🏗 Structure mode
  const structureMode = detectStructureMode(snapshot);
  ctx.structureMode = structureMode;
  console.log(`🏗 Detected structure mode: ${structureMode}`);

  // 📬 Basic contact extraction
  const emails = extractEmails(text);
  const phones = extractPhones(text);
  const contactCount = Math.max(emails.length, phones.length);
  ctx.contacts = Array.from({ length: contactCount })
    .map((_, i) => ({ email: emails[i], phone: phones[i] }))
    .filter((c) => c.email || c.phone);
  ctx.bestContact = chooseBestContact(ctx.contacts);

  // 🧠 Campaign-mode-aware classification
  const leadTypeConfigs =
    campaignModeConfigs[ctx.campaignMode] ?? campaignModeConfigs.universal;

  const { matches, primary } = await classifyLead(snapshot, leadTypeConfigs);
  ctx.leadTypes = matches.map((m) => m.leadType);
  ctx.leadConfidence = primary.confidence;

  // 👤 Core identity fields
  ctx.leadName = extractLeadName(html) ?? undefined;
  ctx.businessName = extractBusinessName(html) ?? undefined;

  // 💼 Services, style, address
  ctx.services = extractServices(text);
  ctx.styleVibe = extractStyleVibe(text);

  const address = extractAddress(text);
  if (address) ctx.location = normalizeLocation(address);

  // 🌐 Socials
  ctx.socials = extractSocials(html);

  // 🪪 Optional debug: save raw page text
  if (input.includeRawText) {
    ctx.text = text;
  }

  // 🧩 Structure-specific extractors could be inserted here in future
}
