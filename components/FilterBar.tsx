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

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="flex flex-wrap gap-4 w-full">
        {/* Rooms */}
        <div className="flex-[0.5] min-w-[4rem]">
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('rooms')}
          </label>
          <select
            value={filters.rooms ?? ''}
            onChange={(e) => update({ rooms: e.target.value === '' ? null : Number(e.target.value) })}
            className="w-full px-2 py-1.5 text-xs border border-neutral-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-warm-dark bg-white"
          >
            <option value="">{t('roomsAll')}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Square meters */}
        <div className="flex-[2] min-w-[10rem]">
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
        <div className="flex-[2] min-w-[10rem]">
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
        <div className="flex-[2] min-w-[12rem]">
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
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* City part */}
        <div className="flex-1 min-w-[7rem]">
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('cityPart')}
          </label>
          <select
            value={filters.cityPart}
            onChange={(e) => update({ cityPart: e.target.value })}
            className="w-full px-2 py-1.5 text-xs border border-neutral-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-warm-dark bg-white"
          >
            {[{ key: '__all__', value: '', label: t('allCityParts') }, ...cityParts.map((cp) => ({ key: cp, value: cp, label: cp }))].map(
              (opt) => (
                <option key={opt.key} value={opt.value}>
                  {opt.label}
                </option>
              )
            )}
          </select>
        </div>

        {/* Sort */}
        <div className="flex-1 min-w-[7rem]">
          <label className="block text-xs font-heading font-semibold text-neutral-dark mb-1.5">
            {t('sortBy')}
          </label>
          <select
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as Filters['sort'] })}
            className="w-full px-2 py-1.5 text-xs border border-neutral-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-warm-dark bg-white"
          >
            <option key="rentAsc" value="rentAsc">{t('sortRentAsc')}</option>
            <option key="rentDesc" value="rentDesc">{t('sortRentDesc')}</option>
            <option key="sqmAsc" value="sqmAsc">{t('sortSqmAsc')}</option>
            <option key="sqmDesc" value="sqmDesc">{t('sortSqmDesc')}</option>
          </select>
        </div>

      </div>

      {/* Reset */}
      <div className="mt-3 flex justify-end">
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
