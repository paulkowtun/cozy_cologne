'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocalizedListing } from '@/lib/types';

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKoAk//Z';

interface ApartmentCardProps {
  listing: LocalizedListing;
}

export default function ApartmentCard({ listing }: ApartmentCardProps) {
  const t = useTranslations('apartments');

  return (
    <Link
      href={`/${listing.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-warm-light">
        {listing.images.length > 0 ? (
          <Image
            src={listing.images[0]}
            alt={listing.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-warm-dark font-heading">
            No image
          </div>
        )}

        {/* Type badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-white/90 text-brand-warm-dark backdrop-blur-sm">
          {listing.typ === 'wohnung' ? t('apartment') : t('flatShare')}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading font-bold text-page-black text-lg mb-1 line-clamp-1">
          {listing.name}
        </h3>
        <p className="text-sm text-neutral-light mb-3">{listing.stadtteil}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm text-neutral-dark mb-4">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            {listing.zimmer} {t('rooms')}
          </span>
          <span>
            {listing.quadratmeter} {t('sqmShort')}
            {listing.typ === 'wg' && listing.gemeinschaftsflaeche > 0 && (
              <> + {listing.gemeinschaftsflaeche} {t('sqmShort')}</>
            )}
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {new Date(listing.verfuegbarAb).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </span>
        </div>

        {/* Feature icons */}
        <div className="flex gap-2 mb-4">
          {listing.terrasse && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-brand-warm-light text-brand-warm-dark font-heading">
              {t('terrace')}
            </span>
          )}
          {listing.aufzug && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-brand-warm-light text-brand-warm-dark font-heading">
              {t('elevator')}
            </span>
          )}
          {listing.parkplatz && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-brand-warm-light text-brand-warm-dark font-heading">
              {t('parking')}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-between">
          <span className="font-heading font-bold text-xl text-brand-warm-dark">
            {listing.warmmiete.toLocaleString('de-DE')} &euro;
          </span>
          <span className="text-xs text-neutral-light">{t('warmRent')} {t('perMonth')}</span>
        </div>
      </div>
    </Link>
  );
}
