// File: src/extractors/runExtractors.ts

import type { PageSnapshot } from '../utils/snapshot';
import type { DomainContext, CampaignMode } from '../utils/types';

import { extractEmails } from './email';
import { extractPhones } from './phone';
import { extractStyleVibe } from './styleVibe';
import { extractServices } from './services';
import { extractAddress } from './address';
import { extractSocials } from './socials';
import { extractVendorName } from './name';
import { chooseBestContact } from '../parsers/contactChooser';
import { classifyVendor } from '../parsers/vendorClassifier';
import { normalizeLocation } from '../parsers/locationNorm';

export async function runExtractors(
  snapshot: PageSnapshot,
  ctx: DomainContext,
  mode: CampaignMode
): Promise<void> {
  const html = snapshot.html;
  const text = snapshot.text;

  // Extract emails and phones
  const emails = extractEmails(text);
  const phones = extractPhones(text);

  // Attach contacts
  ctx.contacts = emails.map((email) => ({ email }));
  ctx.contacts.forEach((c, i) => {
    if (phones[i]) c.phone = phones[i];
  });
  ctx.bestContact = chooseBestContact(ctx.contacts);

  // Vendor classification (new integrated version)
  ctx.vendor = classifyVendor(snapshot);
  ctx.vendor.name = extractVendorName(html);

  // Services and style
  ctx.services = extractServices(text);
  ctx.styleVibe = extractStyleVibe(text);

  // Address and location
  const address = extractAddress(text);
  if (address) {
    ctx.location = normalizeLocation(address);
  }

  // Social links
  ctx.socials = extractSocials(html);
}
