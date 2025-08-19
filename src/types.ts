// File: src/types.ts

export type CampaignMode = 'wedding' | 'corporate' | 'mixed';

// Basic contact (for people or generic contacts)
export interface Contact {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  source?: string; // e.g., URL or evidence
}

// Location info normalized from address strings
export interface Location {
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  serviceRadius?: string;
}

// Vendor metadata
export interface Vendor {
  type?: string;              // e.g. venue, planner
  confidence?: number;        // 0..1
  name?: string;              // e.g. “Riverdale Events Co.”
  segmentFocus?: string[];    // wedding, corporate, social
  eventTypes?: string[];      // conference, gala, etc.
  values?: string[];          // optional, e.g. women-owned
  socialProof?: string[];     // awards, testimonials
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
}

// Snapshot of a single page’s scraped info
export interface PageSignals {
  url: string;
  title?: string;
  emails?: string[];
  phoneCandidates?: string[];
  rfpUrl?: string | null;
  contactUrl?: string | null;
}

// Canonical output format for Apify dataset
export interface Lead {
  domain: string;
  seedUrl: string;

  vendor?: Vendor;
  location?: Location;
  contacts: Contact[];
  people?: Contact[];

  socials?: Record<string, string>;
  services?: string[];
  styleVibe?: string[];
  capacityNotes?: string;
  portfolio?: string[];

  evidence?: string[];
  crawlRunId: string;
  ts: string;
}

// In-memory, evolving context during crawl
export interface DomainContext {
  domain: string;
  seedUrl: string;

  pagesVisited: Set<string>;
  signals: PageSignals[];

  contacts: Contact[];
  bestContact?: Contact;

  vendor?: Vendor;
  location?: Location;
  people?: Contact[];

  services?: string[];
  socials?: Record<string, string>;
  styleVibe?: string[];
  capacityNotes?: string;
  portfolio?: string[];

  evidence?: string[];
  crawlRunId?: string;
  ts?: string;

  score: number;         // 0..1
  stopReason?: string;
}
