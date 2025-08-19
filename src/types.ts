// File: src/types.ts

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
  vendorType?: string;
  vendorTypeHints?: string[];
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
  values?: string[] | string;
  socialProof?: string[] | string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  vendorName?: string;
  portfolioLinks?: string[];
  text?: string; // ✅ NEW — for classifier scoring
}

export interface Lead {
  domain: string;
  seedUrl: string;
  vendorName?: string;
  vendorType?: string;
  vendorConfidence?: number;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
  services?: string[];
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  capacityNotes?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    metro?: string;
  };
  serviceRadius?: string;
  values?: string[] | string;
  socialProof?: string[] | string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  portfolioLinks?: string[];
  crawlRunId?: string;
  ts?: string;
  company?: string;
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  score: number;
  stopReason?: string;

  vendorType?: string;
  vendorConfidence?: number;
  vendorName?: string;

  contacts?: Contact[];
  bestContact?: Contact;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;

  company?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
    metro?: string;
  };
  serviceRadius?: string;
  values?: string[] | string;
  socialProof?: string[] | string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  capacityNotes?: string;
  portfolioLinks?: string[];
  crawlRunId?: string;
  ts?: string;
  text?: string; // propagated for scoring if needed
}

export interface MessagePersona {
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
  capacity?: string;
  location?: string;
  serviceRadius?: string;
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number | null;
  revMinimumUSD?: number | null;
  bookingLink?: string | null;
  people?: Contact[];
  company?: string;
  bestHookIdeas: string[];
}
