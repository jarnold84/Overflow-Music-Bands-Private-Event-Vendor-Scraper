// File: src/types.ts

export interface Contact {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  contactPage?: string;
  rfpUrl?: string;
}

export interface PageSignals {
  url: string;
  html?: string;
  text?: string;
  emails?: string[];
  phones?: string[];
  contacts?: Contact[];
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  services?: string[];
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  capacityNotes?: string;
  serviceRadius?: string;
  values?: string[] | string;
  socialProof?: string[] | string;
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  vendorName?: string;
  portfolioLinks?: string[];
}

export interface DomainContext {
  domain: string;
  seedUrl: string;
  pagesVisited: Set<string>;
  signals: PageSignals[];
  score: number;
  stopReason?: string;

  // Contact info
  contacts?: Contact[];
  bestContact?: Contact;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;

  // Classification
  vendorType?: string;
  vendorConfidence?: number;
  vendorName?: string;
  company?: string;

  // Personalization context
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
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
  portfolioLinks?: string[];

  crawlRunId?: string;
  ts?: string;
}

export interface Lead {
  domain: string;
  email?: string;
  phone?: string;
  vendorType?: string;
  vendorConfidence?: number;
  vendorName?: string;
  company?: string;
  services?: string[];
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
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
  portfolioLinks?: string[];
  contactPage?: string;
  rfpUrl?: string;
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
