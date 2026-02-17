import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ApartmentSearch from '@/components/ApartmentSearch';
import ContactForm from '@/components/ContactForm';
import { getListings, getLocalizedListing } from '@/lib/listings';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  const locale = await getLocale();

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: '/de',
        en: '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allListings = getListings();
  const localizedListings = allListings.map((l) =>
    getLocalizedListing(l, locale)
  );

  return (
    <>
      <Hero />
      <About />
      <ApartmentSearch listings={localizedListings} />
      <ContactForm />
    </>
  );
}
