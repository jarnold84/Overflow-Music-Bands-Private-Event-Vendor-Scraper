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
  emails?: string[];
  phones?: string[];
  contacts?: Contact[];
  city?: string;
  state?: string;
  country?: string;
  metro?: string;
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
  capacityNotes?: string;
  serviceRadius?: string;
  socialProof?: string[] | string;
  values?: string[] | string;
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

  // Contacts
  contacts?: Contact[];
  bestContact?: Contact;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
  email?: string;

  // Metadata
  vendorType?: string;
  vendorConfidence?: number;
  vendorName?: string;
  company?: string;

  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
  clienteleProfile?: string;
  services?: string[];
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

  // Location
  location?: {
    city?: string;
    state?: string;
    country?: string;
    metro?: string;
  };

  // Other
  stopReason?: string;
}

export interface Lead {
  domain: string;
  seedUrl: string;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
  vendorType?: string;
  vendorName?: string;
  company?: string;
  vendorConfidence?: number;
  segmentFocus?: string;
  eventTypes?: string[];
  styleVibe?: string[];
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

export interface ActorInput {
  startUrls: { url: string }[];
  campaignMode?: 'wedding' | 'corporate' | 'mixed';
}
