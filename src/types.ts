// File: src/types.ts

export interface Contact {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
}

export interface PageSignals {
  contacts?: Contact[];
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  services?: string[];
  styleVibe?: string[];
  capacityNotes?: string;
  serviceRadius?: string;
  socialProof?: string[] | string;
  values?: string[] | string;
  bookingLink?: string;
  people?: Contact[];
  vendorName?: string;
  phoneCandidates?: string[];
  contactUrl?: string;
  portfolioLinks?: string[];
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  bestContact?: Contact;
  contacts?: Contact[];
  vendorType?: string;
  vendorConfidence?: number;
  vendorName?: string;
  score: number;
  stopReason?: string;
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
}

export interface Lead {
  domain: string;
  vendorType?: string;
  vendorName?: string;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
  capacityNotes?: string;
  location?: {
    metro?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  serviceRadius?: string;
  values?: string[] | string;
  socialProof?: string[] | string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  company?: string;
  crawlRunId?: string;
  ts?: string;
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
