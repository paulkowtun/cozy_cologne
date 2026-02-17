'use client';

import { useTranslations } from 'next-intl';

export interface Filters {
  rooms: number | null;
  sqmMin: number;
  sqmMax: number;
  type: 'all' | 'wohnung' | 'wg';
  terrace: boolean | null;
  elevator: boolean | null;
  parking: boolean | null;
  cityPart: string;
  sort: 'rentAsc' | 'rentDesc' | 'sqmAsc' | 'sqmDesc';
}

export const defaultFilters: Filters = {
  rooms: null,
  sqmMin: 0,
  sqmMax: 300,
  type: 'all',
  terrace: null,
  elevator: null,
  parking: null,
  cityPart: '',
  sort: 'rentAsc',
};

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  cityParts: string[];
}

export default function FilterBar({ filters, onFilterChange, cityParts }: FilterBarProps) {
  const t = useTranslations('apartments');

  const update = (partial: Partial<Filters>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const roomOptions = [null, 1, 2, 3, 4];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Rooms */}
        <div>
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('rooms')}
          </label>
          <div className="flex gap-1">
            {roomOptions.map((r) => (
              <button
                key={r ?? 'all'}
                onClick={() => update({ rooms: r })}
                className={`flex-1 py-1.5 text-xs font-heading font-medium rounded-lg transition-colors ${
                  filters.rooms === r
                    ? 'bg-brand-warm-dark text-white'
                    : 'bg-brand-warm-light/50 text-neutral-dark hover:bg-brand-warm-light'
                }`}
              >
                {r === null ? t('roomsAll') : r === 4 ? '4+' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Square meters */}
        <div>
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('sqm')}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={t('min')}
              value={filters.sqmMin || ''}
              onChange={(e) => update({ sqmMin: Number(e.target.value) || 0 })}
              className="w-full px-2 py-1.5 text-xs border border-neutral-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-warm-dark"
            />
            <input
              type="number"
              placeholder={t('max')}
              value={filters.sqmMax < 300 ? filters.sqmMax : ''}
              onChange={(e) => update({ sqmMax: Number(e.target.value) || 300 })}
              className="w-full px-2 py-1.5 text-xs border border-neutral-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-warm-dark"
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('type')}
          </label>
          <div className="flex gap-1">
            {(['all', 'wohnung', 'wg'] as const).map((typ) => (
              <button
                key={typ}
                onClick={() => update({ type: typ })}
                className={`flex-1 py-1.5 text-xs font-heading font-medium rounded-lg transition-colors ${
                  filters.type === typ
                    ? 'bg-brand-warm-dark text-white'
                    : 'bg-brand-warm-light/50 text-neutral-dark hover:bg-brand-warm-light'
                }`}
              >
                {typ === 'all' ? t('allTypes') : typ === 'wohnung' ? t('apartment') : t('flatShare')}
              </button>
            ))}
          </div>
        </div>

        {/* Boolean toggles */}
        <div>
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('features')}
          </label>
          <div className="flex gap-1">
            {([
              { key: 'terrace' as const, label: t('terrace') },
              { key: 'elevator' as const, label: t('elevator') },
              { key: 'parking' as const, label: t('parking') },
            ]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() =>
                  update({ [key]: filters[key] === true ? null : true })
                }
                className={`flex-1 py-1.5 text-xs font-heading font-medium rounded-lg transition-colors ${
                  filters[key] === true
                    ? 'bg-brand-warm-dark text-white'
                    : 'bg-brand-warm-light/50 text-neutral-dark hover:bg-brand-warm-light'
                }`}
                title={label}
              >
                {label.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* City part */}
        <div>
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('cityPart')}
          </label>
          <select
            value={filters.cityPart}
            onChange={(e) => update({ cityPart: e.target.value })}
            className="w-full px-2 py-1.5 text-xs border border-neutral-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-warm-dark bg-white"
          >
            <option value="">{t('allCityParts')}</option>
            {cityParts.map((cp) => (
              <option key={cp} value={cp}>
                {cp}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('sortBy')}
          </label>
          <select
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as Filters['sort'] })}
            className="w-full px-2 py-1.5 text-xs border border-neutral-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-warm-dark bg-white"
          >
            <option value="rentAsc">{t('sortRentAsc')}</option>
            <option value="rentDesc">{t('sortRentDesc')}</option>
            <option value="sqmAsc">{t('sortSqmAsc')}</option>
            <option value="sqmDesc">{t('sortSqmDesc')}</option>
          </select>
        </div>
      </div>

      {/* Reset */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onFilterChange(defaultFilters)}
          className="text-xs font-heading font-medium text-brand-warm-dark hover:underline"
        >
          {t('resetFilters')}
        </button>
      </div>
    </div>
  );
}
