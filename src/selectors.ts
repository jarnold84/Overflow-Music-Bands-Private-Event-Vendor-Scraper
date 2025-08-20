// File: src/selectors.ts

import { PseudoUrl } from 'crawlee';

export const ROUTE_PATTERNS = {
  about: new PseudoUrl('[.*\\/about.*]'),
  contact: new PseudoUrl('[.*\\/contact.*]'),
  services: new PseudoUrl('[.*\\/services.*]'),
  team: new PseudoUrl('[.*\\/team.*]'),
  default: new PseudoUrl('[.*]'), // fallback
};
