// File: src/utils/types.ts

export type ActorInput = {
  startUrls: string[];
  mode: 'wedding' | 'corporate';
};

export type Lead = {
  vendor?: {
    name?: string;
    typeHints?: string[];
  };
  services?: string[];
  styleVibe?: string[];
  location?: string;
  socials?: string[];
  contacts?: {
    email?: string;
    phone?: string;
  }[];
  bestContact?: {
    email?: string;
    phone?: string;
  };
  segmentFocus?: string;
  eventTypes?: string[];
  clienteleProfile?: string;
  capacityNotes?: string;
  serviceRadius?: string;
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  vendorName?: string;
  vendorType?: string;
  vendorConfidence?: number;
  email?: string;
  phone?: string;
  contactPage?: string;
  rfpUrl?: string;
  company?: string;
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
  values?: string[];
  socialProof?: string[];
  fnbMinimumUSD?: number;
  revMinimumUSD?: number;
  bookingLink?: string;
  people?: Contact[];
  vendorName?: string;
  portfolioLinks?: string[];
  text?: string; // ✅ for classifier scoring
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
  text?: string; // for classifier scoring
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
