export interface ListingRaw {
  name: string;
  nameEN: string;
  adresse: string;
  stadtteil: string;
  typ: 'wohnung' | 'wg';
  zimmer: number;
  quadratmeter: number;
  etage: number;
  warmmiete: number;
  kaltmiete: number;
  nebenkosten: number;
  verfuegbarAb: string;
  mindestmietdauer: string;
  mindestmietdauerEN: string;
  terrasse: boolean;
  aufzug: boolean;
  parkplatz: boolean;
  ausstattung: string[];
  ausstattungEN: string[];
  highlights: string[];
  highlightsEN: string[];
  beschreibung: string;
  beschreibungEN: string;
}

export interface Listing extends ListingRaw {
  slug: string;
  images: string[];
}

export interface LocalizedListing {
  slug: string;
  name: string;
  adresse: string;
  stadtteil: string;
  typ: 'wohnung' | 'wg';
  zimmer: number;
  quadratmeter: number;
  etage: number;
  warmmiete: number;
  kaltmiete: number;
  nebenkosten: number;
  verfuegbarAb: string;
  mindestmietdauer: string;
  terrasse: boolean;
  aufzug: boolean;
  parkplatz: boolean;
  ausstattung: string[];
  highlights: string[];
  beschreibung: string;
  images: string[];
}
