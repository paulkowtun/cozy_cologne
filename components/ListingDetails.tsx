'use client';

import { useTranslations } from 'next-intl';
import { LocalizedListing } from '@/lib/types';

interface ListingDetailsProps {
  listing: LocalizedListing;
}

export default function ListingDetails({ listing }: ListingDetailsProps) {
  const t = useTranslations('listing');

  return (
    <div>
      {/* Name and type */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-heading font-semibold bg-brand-warm-light text-brand-warm-dark mb-3">
          {listing.typ === 'wohnung' ? t('apartment') : t('flatShare')}
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-page-black">
          {listing.name}
        </h1>
        <p className="text-neutral-light mt-2">{listing.adresse}</p>
      </div>

      {/* Key stats */}
      {listing.typ === 'wg' ? (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-brand-warm-light/50 rounded-brand p-4 text-center">
            <p className="text-2xl font-heading font-bold text-page-black">{listing.zimmer}</p>
            <p className="text-xs text-neutral-dark font-heading">{t('roomsWithKitchenBath')}</p>
          </div>
          <div className="bg-brand-warm-light/50 rounded-brand p-4 text-center">
            <p className="text-2xl font-heading font-bold text-page-black">{listing.quadratmeter}</p>
            <p className="text-xs text-neutral-dark font-heading">m² {t('perRoom')}</p>
          </div>
          {listing.gemeinschaftsflaeche > 0 && (
            <div className="bg-brand-warm-light/50 rounded-brand p-4 flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-heading font-bold text-page-black">{listing.gemeinschaftsflaeche}</p>
              <p className="text-xs text-neutral-dark font-heading">m² {t('sharedArea')}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-brand-warm-light/50 rounded-brand p-5 text-center">
            <p className="text-3xl font-heading font-bold text-page-black">{listing.zimmer}</p>
            <p className="text-sm text-neutral-dark font-heading">{t('rooms')}</p>
          </div>
          <div className="bg-brand-warm-light/50 rounded-brand p-5 text-center">
            <p className="text-3xl font-heading font-bold text-page-black">{listing.quadratmeter}</p>
            <p className="text-sm text-neutral-dark font-heading">m²</p>
          </div>
        </div>
      )}

      {/* Rent breakdown */}
      <div className="bg-white rounded-2xl border border-neutral-light/30 p-6 mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <span className="font-heading font-bold text-3xl text-brand-warm-dark">
            {listing.warmmiete.toLocaleString('de-DE')} &euro;
          </span>
          <span className="text-sm text-neutral-light font-heading">{t('warmRent')} / Monat</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-dark">{t('coldRent')}</span>
            <span className="font-medium text-page-black">{listing.kaltmiete.toLocaleString('de-DE')} &euro;</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-dark">{t('utilities')}</span>
            <span className="font-medium text-page-black">{listing.nebenkosten.toLocaleString('de-DE')} &euro;</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between py-3 border-b border-neutral-light/30">
          <span className="font-heading font-bold text-page-black">{t('availableFrom')}</span>
          <span className="font-heading font-bold text-page-black">
            {new Date(listing.verfuegbarAb).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>
        {listing.typ === 'wg' && listing.gemeinschaftsflaeche > 0 && (
          <>
            <div className="flex justify-between py-3 border-b border-neutral-light/30">
              <span className="text-neutral-dark">{t('areaPerRoom')}</span>
              <span className="font-medium text-page-black">{listing.quadratmeter} m&sup2;</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-light/30">
              <span className="text-neutral-dark">{t('sharedArea')}</span>
              <span className="font-medium text-page-black">{listing.gemeinschaftsflaeche} m&sup2;</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-light/30">
              <span className="text-neutral-dark">{t('totalAreaWg')}</span>
              <span className="font-medium text-page-black">{listing.quadratmeter * listing.zimmer + listing.gemeinschaftsflaeche} m&sup2;</span>
            </div>
          </>
        )}
        {listing.typ === 'wohnung' && (
          <div className="flex justify-between py-3 border-b border-neutral-light/30">
            <span className="text-neutral-dark">{t('sqm')}</span>
            <span className="font-medium text-page-black">{listing.quadratmeter} m&sup2;</span>
          </div>
        )}
        <div className="flex justify-between py-3 border-b border-neutral-light/30">
          <span className="text-neutral-dark">{t('floor')}</span>
          <span className="font-medium text-page-black">{listing.etage}.</span>
        </div>
        <div className="flex justify-between py-3 border-b border-neutral-light/30">
          <span className="text-neutral-dark">{t('minRental')}</span>
          <span className="font-medium text-page-black">{listing.mindestmietdauer}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-neutral-light/30">
          <span className="text-neutral-dark">{t('deposit')}</span>
          <span className="font-medium text-page-black">{(listing.kaltmiete * 3).toLocaleString('de-DE')} &euro;</span>
        </div>
      </div>

      {/* Energieausweis */}
      <div className="mb-8">
        <h2 className="font-heading font-bold text-lg text-page-black mb-4">{t('energyCertificate')}</h2>
        {listing.energieausweisArt === 'denkmal' ? (
          <p className="text-neutral-dark py-3">{t('monumentProtection')}</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-neutral-light/30">
              <span className="text-neutral-dark">{t('energyCertificateType')}</span>
              <span className="font-medium text-page-black">
                {listing.energieausweisArt === 'bedarfsausweis' ? t('demandCertificate') : t('consumptionCertificate')}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-light/30">
              <span className="text-neutral-dark">
                {listing.energieausweisArt === 'bedarfsausweis' ? t('energyDemand') : t('energyConsumption')}
              </span>
              <span className="font-medium text-page-black">{listing.endenergie} kWh/m&sup2;a</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-light/30">
              <span className="text-neutral-dark">{t('energySource')}</span>
              <span className="font-medium text-page-black">{listing.energietraeger}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-light/30">
              <span className="text-neutral-dark">{t('buildingYear')}</span>
              <span className="font-medium text-page-black">{listing.baujahr}</span>
            </div>
            {listing.effizienzklasse && (
              <div className="flex justify-between py-3 border-b border-neutral-light/30">
                <span className="text-neutral-dark">{t('efficiencyClass')}</span>
                <span className="font-medium text-page-black">{listing.effizienzklasse}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mb-8">
        <h2 className="font-heading font-bold text-lg text-page-black mb-4">{t('features')}</h2>
        <div className="flex flex-wrap gap-2">
          {listing.ausstattung.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-full text-sm bg-brand-warm-light text-brand-warm-dark font-heading font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="mb-8">
        <h2 className="font-heading font-bold text-lg text-page-black mb-4">{t('highlights')}</h2>
        <ul className="space-y-2">
          {listing.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-warm-dark flex-shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-neutral-dark">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact CTA */}
      <a
        href="#contact"
        className="block w-full text-center rounded-brand bg-brand-warm-dark px-8 py-4 font-heading font-semibold text-white hover:bg-brand-warm-dark/90 hover:shadow-lg transition-all duration-300"
      >
        {t('contactCta')}
      </a>
    </div>
  );
}
