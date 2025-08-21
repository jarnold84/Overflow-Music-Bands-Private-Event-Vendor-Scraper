// File: src/extractors/runExtractors.ts

import type { DomainContext, CampaignMode } from '../utils/types';
import type { PageSnapshot } from '../utils/snapshot';

import { extractEmails } from './email.js';
import { extractPhones } from './phone.js';
import { extractStyleVibe } from './styleVibe.js';
import { extractServices } from './services.js';
import { extractAddress } from './address.js';
import { extractSocials } from './socials.js';
import { extractVendorName } from './name.js';

import { chooseBestContact } from '../parsers/contactChooser.js';
import { normalizeLocation } from '../parsers/locationNorm.js';

export async function runExtractors(
  snapshot: PageSnapshot,
  ctx: DomainContext,
  mode: CampaignMode
): Promise<void> {
  const { html, text } = snapshot;

  // Contacts (emails/phones)
  const emails = extractEmails(text);
  const phones = extractPhones(text);
  const contactCount = Math.max(emails.length, phones.length);
  ctx.contacts = Array.from({ length: contactCount })
    .map((_, i) => ({ email: emails[i], phone: phones[i] }))
    .filter((c) => c.email || c.phone);
  ctx.bestContact = chooseBestContact(ctx.contacts);

  // Vendor basics
  ctx.vendorName = extractVendorName(html) ?? undefined;

  // Content signals
  ctx.services = extractServices(text);
  ctx.styleVibe = extractStyleVibe(text);

  const address = extractAddress(text);
  if (address) ctx.location = normalizeLocation(address);

  // Socials
  ctx.socials = extractSocials(html);

  // (Optional) Mode-specific weighting can be applied elsewhere in scoring
}
