import type { ImageMetadata } from 'astro';

/** An optimisable photo plus its alt text in the page language. */
export interface Photo {
  src: ImageMetadata;
  alt: string;
}

/** A logo served as-is from public/ (SVG, no optimisation needed). */
export interface LogoAsset {
  src: string;
  width: number;
  height: number;
}

/** A heading that ends in the profile's gold accent: `{lead} <span.gi>{accent}</span>`. */
export interface AccentTitle {
  lead: string;
  accent: string;
}

export type CompanyId = 'motors' | 'trading' | 'upgraded' | 'realfresh' | 'ev' | 'stones';

/** What every page needs to know about a Group company. Page bodies live in company-pages.ts. */
export interface Company {
  id: CompanyId;
  /** Two-digit chapter number, '01'–'06'. */
  number: string;
  /** Locale-free path, e.g. '/nsl-trading'. Localise with getLocalizedPath(). */
  path: string;
  name: string;
  shortName: string;
  legalName: string;
  sector: string;
  logo: LogoAsset;
  tagline: string;
  summary: string;
  focus: string;
  points: string[];
  cover: Photo;
  detail: Photo;
  cta: string;
}
