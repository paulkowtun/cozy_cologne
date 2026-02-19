// To add a new listing:
// 1. Create a folder in /public/listings/ (folder name becomes the URL slug)
// 2. Add a listing.json following the template (see listing-template.json)
// 3. Add a bilder/ subfolder with photos (named 01-xxx.jpg, 02-xxx.jpg, etc.)
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
  const decoded = decodeURIComponent(slug);
  const listingDir = path.join(LISTINGS_DIR, decoded);
  const jsonPath = path.join(listingDir, 'listing.json');

  if (!fs.existsSync(jsonPath)) return null;

  const raw: ListingRaw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const bilderDir = path.join(listingDir, 'bilder');

  let images: string[] = [];
  if (fs.existsSync(bilderDir)) {
    images = fs.readdirSync(bilderDir)
      .filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f))
      .sort()
      .map((f) => `/listings/${slug}/bilder/${f}`);
  }

  // Flatten nested JSON into flat Listing
  const featureLabelsDe: Record<string, string> = {
    aufzug: 'Aufzug',
    parkplatz: 'Parkplatz',
    keller: 'Fahrradstellplatz',
  };
  const featureLabelsEn: Record<string, string> = {
    aufzug: 'Elevator',
    parkplatz: 'Parking',
    keller: 'Bicycle Parking',
  };

  const hasTerrasse = raw.ausstattung.terrasse === true;
  const hasBalkon = raw.ausstattung.balkon === true;

  const ausstattungDe: string[] = [];
  const ausstattungEn: string[] = [];

  if (hasTerrasse && hasBalkon) {
    ausstattungDe.push('Terrasse & Balkon');
    ausstattungEn.push('Terrace & Balcony');
  } else if (hasTerrasse) {
    ausstattungDe.push('Terrasse');
    ausstattungEn.push('Terrace');
  } else if (hasBalkon) {
    ausstattungDe.push('Balkon');
    ausstattungEn.push('Balcony');
  }

  const hasWaschmaschine = raw.ausstattung.waschmaschine === true;
  const hasTrockner = raw.ausstattung.trockner === true;

  if (hasWaschmaschine && hasTrockner) {
    ausstattungDe.push('Waschmaschine & Trockner');
    ausstattungEn.push('Washing Machine & Dryer');
  } else if (hasWaschmaschine) {
    ausstattungDe.push('Waschmaschine');
    ausstattungEn.push('Washing Machine');
  } else if (hasTrockner) {
    ausstattungDe.push('Trockner');
    ausstattungEn.push('Dryer');
  }

  const pairedKeys = ['terrasse', 'balkon', 'waschmaschine', 'trockner'];

  for (const [key, val] of Object.entries(raw.ausstattung)) {
    if (val !== true || pairedKeys.includes(key)) continue;
    ausstattungDe.push(featureLabelsDe[key] ?? key);
    ausstattungEn.push(featureLabelsEn[key] ?? key);
  }

  return {
    slug,
    name: raw.name,
    nameEN: raw.nameEN,
    adresse: `${raw.adresse.strasse}, ${raw.adresse.plz} ${raw.adresse.stadt}`,
    stadtteil: raw.adresse.stadtteil,
    stadtteilEN: raw.adresse.stadtteilEN,
    typ: raw.typ,
    zimmer: raw.zimmer,
    quadratmeter: raw.quadratmeter,
    gemeinschaftsflaeche: raw.gemeinschaftsflaeche ?? 0,
    etage: raw.etage,
    warmmiete: raw.miete.warmmiete,
    kaltmiete: raw.miete.kaltmiete,
    nebenkosten: raw.miete.nebenkosten,
    verfuegbarAb: raw.verfuegbarAb,
    mindestmietdauer: raw.mindestmietdauer,
    mindestmietdauerEN: raw.mindestmietdauerEN,
    terrasse: raw.ausstattung.terrasse ?? false,
    aufzug: raw.ausstattung.aufzug ?? false,
    parkplatz: raw.ausstattung.parkplatz ?? false,
    ausstattung: ausstattungDe,
    ausstattungEN: ausstattungEn,
    energieausweisArt: raw.energieausweis?.art,
    endenergie: raw.energieausweis?.endenergie,
    energietraeger: raw.energieausweis?.energietraeger,
    energietraegerEN: raw.energieausweis?.energietraegerEN,
    baujahr: raw.energieausweis?.baujahr,
    effizienzklasse: raw.energieausweis?.effizienzklasse,
    highlights: raw.highlights,
    highlightsEN: raw.highlightsEN,
    beschreibung: raw.beschreibung,
    beschreibungEN: raw.beschreibungEN,
    images,
  };
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
    stadtteil: isEN ? listing.stadtteilEN : listing.stadtteil,
    typ: listing.typ,
    zimmer: listing.zimmer,
    quadratmeter: listing.quadratmeter,
    gemeinschaftsflaeche: listing.gemeinschaftsflaeche,
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
    energieausweisArt: listing.energieausweisArt,
    endenergie: listing.endenergie,
    energietraeger: isEN ? listing.energietraegerEN : listing.energietraeger,
    baujahr: listing.baujahr,
    effizienzklasse: listing.effizienzklasse,
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
