'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import FilterBar, { Filters, defaultFilters } from './FilterBar';
import ApartmentCard from './ApartmentCard';
import { LocalizedListing } from '@/lib/types';

const ITEMS_PER_PAGE = 12;

interface ApartmentSearchProps {
  listings: LocalizedListing[];
}

export default function ApartmentSearch({ listings }: ApartmentSearchProps) {
  const t = useTranslations('apartments');
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const cityParts = useMemo(() => {
    const parts = [...new Set(listings.map((l) => l.stadtteil))];
    return parts.sort();
  }, [listings]);

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      if (filters.rooms !== null) {
        if (filters.rooms === 5) {
          if (l.zimmer < 5) return false;
        } else {
          if (l.zimmer !== filters.rooms) return false;
        }
      }
      if (filters.sqmMin > 0 && l.quadratmeter < filters.sqmMin) return false;
      if (filters.sqmMax < 300 && l.quadratmeter > filters.sqmMax) return false;
      if (filters.type !== 'all' && l.typ !== filters.type) return false;
      if (filters.terrace === true && !l.terrasse) return false;
      if (filters.elevator === true && !l.aufzug) return false;
      if (filters.parking === true && !l.parkplatz) return false;
      if (filters.cityPart && l.stadtteil !== filters.cityPart) return false;
      return true;
    });

    result.sort((a, b) => {
      switch (filters.sort) {
        case 'rentAsc':
          return a.warmmiete - b.warmmiete;
        case 'rentDesc':
          return b.warmmiete - a.warmmiete;
        case 'sqmAsc':
          return a.quadratmeter - b.quadratmeter;
        case 'sqmDesc':
          return b.quadratmeter - a.quadratmeter;
        default:
          return 0;
      }
    });

    return result;
  }, [listings, filters]);

  const visibleListings = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section id="apartments" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-page-black text-center mb-4">
            {t('title')}
          </h2>
          <div className="w-16 h-1 bg-brand-warm-dark rounded-full mx-auto mb-12" />
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={(f) => {
            setFilters(f);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
          cityParts={cityParts}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-neutral-light font-heading">{t('noResults')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleListings.map((listing) => (
                <div key={listing.slug} className="fade-in">
                  <ApartmentCard listing={listing} />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                  className="inline-block rounded-brand border-2 border-brand-warm-dark px-8 py-3 font-heading font-semibold text-brand-warm-dark hover:bg-brand-warm-dark hover:text-white transition-all duration-300"
                >
                  Mehr anzeigen / Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
