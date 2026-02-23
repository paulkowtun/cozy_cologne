'use client';

import { useTranslations } from 'next-intl';
import Logo from './Logo';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-page-black text-neutral-light py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & tagline */}
          <div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              <span className="relative inline-block">
                cozy!
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E8C50B] rounded-full" />
              </span>{' '}
              <span className="text-brand-warm-dark">cologne</span>
            </span>
            <p className="mt-4 text-sm">{t('footer.madeWith')}</p>
            <p className="mt-1 text-sm">
              {t('footer.builtBy')}{' '}
              <a href="https://zentrasoftware.com" target="_blank" rel="noopener noreferrer" className="text-brand-warm-dark hover:text-white transition-colors">
                Zentrasoftware
              </a>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Links</h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              <Link href="/#apartments" className="text-sm hover:text-white transition-colors">
                {t('nav.apartments')}
              </Link>
              <Link href="/#about" className="text-sm hover:text-white transition-colors">
                {t('nav.about')}
              </Link>
              <a href="#contact" className="text-sm hover:text-white transition-colors">
                {t('nav.contact')}
              </a>
              <Link href="/geschaeftskunden" className="text-sm hover:text-white transition-colors">
                {t('nav.b2b')}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Legal</h3>
            <nav className="flex flex-col gap-3" aria-label="Legal links">
              <Link href="/impressum" className="text-sm hover:text-white transition-colors">
                {t('nav.impressum')}
              </Link>
              <Link href="/datenschutz" className="text-sm hover:text-white transition-colors">
                {t('nav.datenschutz')}
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-dark/30 text-center text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
