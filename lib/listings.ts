// To add a new listing:
// 1. Create a folder in /public/listings/ (folder name becomes the URL slug)
// 2. Add a listing.json following the template (see listing-template.json)
// 3. Add an images/ subfolder with photos (named 01-xxx.jpg, 02-xxx.jpg, etc.)
// 4. Run `npm run build` or push to Vercel to deploy
//
// If listing count grows past ~500, consider migrating to a headless CMS
// (e.g. Sanity, Contentful, or Supabase) with ISR (Incremental Static Regeneration).

import fs from 'fs';
import path from 'path';
import { Listing, ListingRaw, LocalizedListing } from './types';

const LISTINGS_DIR = path.join(process.cwd(), 'public', 'listings');

export function getListings(): Listing[] {
  if (!fs.existsSync(LISTINGS_DIR)) return [];

  const dirs = fs.readdirSync(LISTINGS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const listings: Listing[] = [];

  for (const slug of dirs) {
    const listing = getListingBySlug(slug);
    if (listing) listings.push(listing);
  }

  return listings;
}

export function getListingBySlug(slug: string): Listing | null {
  const listingDir = path.join(LISTINGS_DIR, slug);
  const jsonPath = path.join(listingDir, 'listing.json');

  if (!fs.existsSync(jsonPath)) return null;

  const raw: ListingRaw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const imagesDir = path.join(listingDir, 'images');

  let images: string[] = [];
  if (fs.existsSync(imagesDir)) {
    images = fs.readdirSync(imagesDir)
      .filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f))
      .sort()
      .map((f) => `/listings/${slug}/images/${f}`);
  }

  return { ...raw, slug, images };
}

export function getLocalizedListing(
  listing: Listing,
  locale: string
): LocalizedListing {
  const isEN = locale === 'en';

  return {
    slug: listing.slug,
    name: isEN ? listing.nameEN : listing.name,
    adresse: listing.adresse,
    stadtteil: listing.stadtteil,
    typ: listing.typ,
    zimmer: listing.zimmer,
    quadratmeter: listing.quadratmeter,
    etage: listing.etage,
    warmmiete: listing.warmmiete,
    kaltmiete: listing.kaltmiete,
    nebenkosten: listing.nebenkosten,
    verfuegbarAb: listing.verfuegbarAb,
    mindestmietdauer: isEN
      ? listing.mindestmietdauerEN
      : listing.mindestmietdauer,
    terrasse: listing.terrasse,
    aufzug: listing.aufzug,
    parkplatz: listing.parkplatz,
    ausstattung: isEN ? listing.ausstattungEN : listing.ausstattung,
    highlights: isEN ? listing.highlightsEN : listing.highlights,
    beschreibung: isEN ? listing.beschreibungEN : listing.beschreibung,
    images: listing.images,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(LISTINGS_DIR)) return [];

  return fs.readdirSync(LISTINGS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}
