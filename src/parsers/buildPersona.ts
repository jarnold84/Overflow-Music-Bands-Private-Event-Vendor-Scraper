// src/utils/types.ts

export type CampaignMode = 'wedding' | 'corporate' | 'mixed' | 'universal';

export type ActorInput = {
  startUrls: string[];
  mode: CampaignMode;
  maxConcurrency?: number;
  proxyConfiguration?: {
    proxyUrls?: string[];
    useApifyProxy?: boolean;
  };
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
  text?: string; // for classifier scoring
  socials?: Record<
    string,
    {
      handle?: string;
      url?: string;
    }
  >;
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  score: number;
  stopReason?: string;

  // Contact & classification
  leadName?: string;
  businessName?: string;
  leadType?: string;
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
  socials?: Record<
    string,
    {
      handle?: string;
      url?: string;
    }
  >;
}

export interface Lead {
  leadName?: string;
  businessName?: string;
  leadType?: string;
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
🔮 TO DO (Optional Future Enhancements):
- Add `missingInfoReasons?: string[]` for fallback logic and debugging
- Add `sourcePages?: { label: string; url: string }[]` to trace signal origin
- Add `hasValidContact: boolean` for routing logic
- Add `tags?: string[]` for GPT-generated metadata
- Add `primaryChannel?: "email" | "instagram_dm" | "contact_form"` for routing
- Enrich `socials` with metadata (followers, bios, etc.)
- Move file to `src/types.ts` for consistency and clarity
*/
