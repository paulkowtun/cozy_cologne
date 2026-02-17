export interface ListingJsonAdresse {
  strasse: string;
  plz: string;
  stadt: string;
  stadtteil: string;
}

export interface ListingJsonAusstattung {
  terrasse: boolean;
  aufzug: boolean;
  parkplatz: boolean;
  [key: string]: boolean;
}

export interface ListingJsonMiete {
  warmmiete: number;
  kaltmiete: number;
  nebenkosten: number;
  waehrung: string;
}

export interface ListingRaw {
  name: string;
  nameEN: string;
  adresse: ListingJsonAdresse;
  typ: 'wohnung' | 'wg';
  zimmer: number;
  quadratmeter: number;
  etage: number;
  miete: ListingJsonMiete;
  ausstattung: ListingJsonAusstattung;
  verfuegbarAb: string;
  mindestmietdauer: string;
  mindestmietdauerEN: string;
  highlights: string[];
  highlightsEN: string[];
  beschreibung: string;
  beschreibungEN: string;
}

export interface Listing {
  slug: string;
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
