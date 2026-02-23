import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('b2b');
  return { title: `${t('title')} — cozy! cologne` };
}

export default async function GeschaeftskundenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('b2b');

  const pdfUrl = locale === 'de' ? '/Broschuere_Cozy_Cologne.pdf' : '/Brochure_Cozy_Cologne.pdf';
  const pains = [t('pain1'), t('pain2'), t('pain3'), t('pain4'), t('pain5')];
  const benefits = [t('benefit1'), t('benefit2'), t('benefit3'), t('benefit4'), t('benefit5')];
  const abouts = [t('about1'), t('about2'), t('about3'), t('about4')];

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-20">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-page-black mb-6 leading-tight">
          {t('heroHeadline')}
        </h1>
        <p className="text-lg sm:text-xl text-brand-warm-dark font-heading font-semibold">
          {t('heroStat')}
        </p>
      </section>

      {/* Pain Points & Benefits */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Nie wieder */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-page-black mb-6 border-b border-neutral-light pb-3">
              {t('painTitle')}
            </h2>
            <ul className="space-y-4">
              {pains.map((pain, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-500 text-lg font-bold mt-0.5 shrink-0">✕</span>
                  <span className="text-neutral-dark leading-relaxed">{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mit uns */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-page-black mb-6 border-b border-neutral-light pb-3">
              {t('benefitTitle')}
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-600 text-lg font-bold mt-0.5 shrink-0">✓</span>
                  <span className="text-neutral-dark leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section className="bg-brand-warm-light/30 py-16 mb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-page-black mb-6 text-center">
            {t('aboutTitle')}
          </h2>
          <ul className="space-y-3">
            {abouts.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-brand-warm-dark font-bold mt-0.5 shrink-0">•</span>
                <span className="text-neutral-dark leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-page-black mb-4">
          {t('ctaTitle')}
        </h2>
        <p className="text-neutral-dark mb-8">{t('ctaText')}</p>

        <a
          href={pdfUrl}
          download
          className="inline-block rounded-brand bg-brand-warm-dark px-10 py-3.5 font-heading font-semibold text-white hover:bg-brand-warm-dark/90 hover:shadow-lg transition-all duration-300 mb-8"
        >
          {t('downloadFlyer')}
        </a>

        <div className="space-y-2 text-neutral-dark">
          <p>
            <span className="font-semibold">Tel:</span>{' '}
            <a href={`tel:${t('contactPhone')}`} className="text-brand-warm-dark hover:underline">
              {t('contactPhone')}
            </a>
          </p>
          <p>
            <span className="font-semibold">E-Mail:</span>{' '}
            <a href={`mailto:${t('contactEmail')}`} className="text-brand-warm-dark hover:underline">
              {t('contactEmail')}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
