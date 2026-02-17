'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background — top to bottom for text contrast */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, #7A6E5A 0%, #9D8D76 40%, #C4B89E 75%, #FAFAF8 100%)' }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {t('headline')}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
          {t('subheadline')}
        </p>
        <a
          href="#apartments"
          className="inline-block rounded-brand bg-white px-8 py-4 font-heading font-semibold text-brand-warm-dark shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          {t('cta')}
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-page-white to-transparent" />
    </section>
  );
}
