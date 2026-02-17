'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'de' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center rounded-full border border-neutral-light overflow-hidden text-sm">
      <button
        onClick={() => switchLocale('de')}
        className={`px-3 py-1.5 font-heading font-semibold transition-colors ${
          locale === 'de'
            ? 'bg-brand-warm-dark text-white'
            : 'text-neutral-dark hover:bg-brand-warm-light'
        }`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1.5 font-heading font-semibold transition-colors ${
          locale === 'en'
            ? 'bg-brand-warm-dark text-white'
            : 'text-neutral-dark hover:bg-brand-warm-light'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
