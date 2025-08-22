// File: src/utils/types.ts

export type CampaignMode = 'wedding' | 'corporate' | 'mixed' | 'universal';

export type ActorInput = {
  startUrls: Array<string | { url: string }>;
  campaignMode?: CampaignMode; // ✅ Renamed from `mode` to clarify usage
  maxConcurrency?: number;
  proxyConfiguration?: {
    proxyUrls?: string[];
    useApifyProxy?: boolean;
  };
  includeRawText?: boolean;
};

export interface Contact {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
}

export interface PageSnapshot {
  url: string;
  html: string;
  text: string;
  title?: string;
}

export interface PageSignals {
  url?: string;
  title?: string;
  emails?: string[];
  phones?: string[];
  contacts?: Contact[];
  leadType?: string;
  services?: string[];
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  capacityNotes?: string;
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  serviceRadius?: string;
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  leadName?: string;
  businessName?: string;
  portfolioLinks?: string[];
  text?: string;
  socials?: Record<string, { handle?: string; url?: string }>;
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  score: number;
  stopReason?: string;
  structureMode?: string;
  campaignMode?: CampaignMode; // ✅ Injected for campaign-based routing

  // Contact & classification
  leadName?: string;
  businessName?: string;
  leadTypes?: string[];
  leadConfidence?: number;
  contacts?: Contact[];
  bestContact?: Contact | null;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;

  // Business info
  segmentFocus?: string;
  eventTypes?: string[];
  clienteleProfile?: string;
  services?: string[];
  capacityNotes?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    metro?: string;
  };
  serviceRadius?: string;
  values?: string[];
  styleVibe?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  portfolioLinks?: string[];
  crawlRunId?: string;
  ts?: string;
  text?: string;
  socials?: Record<string, { handle?: string; url?: string }>;
}

export interface Lead {
  leadName?: string;
  businessName?: string;
  leadTypes?: string[];
  leadConfidence?: number;
  contacts?: Contact[];
  bestContact?: Contact;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  clienteleProfile?: string;
  services?: string[];
  serviceRadius?: string;
  styleVibe?: string[];
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  capacityNotes?: string;
  portfolioLinks?: string[];
  crawlRunId?: string;
  ts?: string;
  socials?: Record<string, { handle?: string; url?: string }>;
}

export interface MessagePersona {
  leadTypes?: string[];
  leadName?: string;
  businessName?: string;
  services?: string[];
  segmentFocus?: string;
  eventTypes?: string[];
  clienteleProfile?: string;
  styleVibe?: string[];
  capacity?: string;
  location?: string;
  serviceRadius?: string;
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number | null;
  revMinimumUSD?: number | null;
  bookingLink?: string | null;
  people?: Contact[];
  socials?: Record<string, { handle?: string; url?: string }>;
  bestHookIdeas: string[];
}

/*
🧠 Optional TO DOs:
- Add `sourcePages?: { label: string; url: string }[]` to support traceability
- Add `missingFields?: string[]` for enrichment logic
- Add `messagingChannel?: "email" | "ig_dm" | "form"` for use-case targeting
- Add `campaignId?: string` to support run tracking and comparisons
- Move to /types directory and centralize all shared types
*/
