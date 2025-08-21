// File: src/extractors/runExtractors.ts

import type { DomainContext, CampaignMode } from '../utils/types';
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

/**
 * Main extractor pipeline that parses snapshot content
 * and populates the DomainContext with structured signals.
 */
export async function runExtractors(
  snapshot: PageSnapshot,
  ctx: DomainContext,
  mode: CampaignMode
): Promise<void> {
  const { html, text } = snapshot;

  // -------------------------------
  // 📬 CONTACT INFO
  // -------------------------------
  const emails = extractEmails(text);
  const phones = extractPhones(text);

  const contactCount = Math.max(emails.length, phones.length);
  ctx.contacts = Array.from({ length: contactCount })
    .map((_, i) => ({
      email: emails[i],
      phone: phones[i],
    }))
    .filter((c) => c.email || c.phone);

  ctx.bestContact = chooseBestContact(ctx.contacts);

  // -------------------------------
  // 🧑 INDIVIDUAL & BUSINESS NAMES
  // -------------------------------
  ctx.leadName = extractLeadName(html) ?? undefined;
  ctx.businessName = extractBusinessName(html) ?? undefined;

  // -------------------------------
  // 🎨 SERVICES & STYLE
  // -------------------------------
  ctx.services = extractServices(text);
  ctx.styleVibe = extractStyleVibe(text);

  // -------------------------------
  // 🗺️ LOCATION
  // -------------------------------
  const address = extractAddress(text);
  if (address) {
    ctx.location = normalizeLocation(address);
  }

  // -------------------------------
  // 🌐 SOCIAL MEDIA
  // -------------------------------
  ctx.socials = extractSocials(html);

  // (Optional) Campaign-specific scoring logic should occur in stopRules
}
/*
TO DO:

- 💬 Add `extractValues(text)` and `extractSocialProof(text)` modules
    → for ethical positioning, testimonials, etc.

- 🧠 Add GPT fallback if leadName or businessName are still missing
    → requires snapshot text and context

- 🧑‍🤝‍🧑 Add extraction of team members/people (e.g., from team/staff/about pages)
    → update DomainContext.people: Contact[]

- 🕸️ Add `sourcePage` tagging per signal (e.g. came from /about or /services)

- ✨ Add plugin-style modular extractor loader by signal type
    → e.g. runExtractors becomes dynamically loaded pipeline

- 📊 Add basic signal confidence scoring (e.g., email found in footer = high)

- 🛠️ Create per-use-case extractor configs in future (e.g. RetreatHost, PodcastGuest)
*/
