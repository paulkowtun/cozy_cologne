import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { getListingBySlug, getLocalizedListing, getAllSlugs } from '@/lib/listings';
import { routing } from '@/i18n/routing';
import ListingGallery from '@/components/ListingGallery';
import ListingDetails from '@/components/ListingDetails';
import ContactForm from '@/components/ContactForm';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};

  const localized = getLocalizedListing(listing, locale);

  return {
    title: `${localized.name} — cozy! cologne`,
    description: localized.beschreibung.substring(0, 160),
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        de: `/de/${slug}`,
        en: `/en/${slug}`,
      },
    },
    openGraph: {
      title: `${localized.name} — cozy! cologne`,
      description: localized.beschreibung.substring(0, 160),
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
      images: listing.images.length > 0 ? [listing.images[0]] : [],
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const localized = getLocalizedListing(listing, locale);
  const t = await getTranslations('listing');

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: localized.name,
    description: localized.beschreibung,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.adresse,
      addressLocality: 'Köln',
      addressRegion: 'NRW',
      addressCountry: 'DE',
    },
    numberOfRooms: listing.zimmer,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.quadratmeter,
      unitCode: 'MTK',
    },
    ...(listing.images.length > 0 && { image: listing.images[0] }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-24 sm:pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/#apartments"
            className="inline-flex items-center gap-2 text-sm font-heading text-brand-warm-dark hover:underline mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('backToOverview')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Gallery */}
            <div className="lg:col-span-3">
              <ListingGallery images={localized.images} name={localized.name} />
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <ListingDetails listing={localized} />
            </div>
          </div>
        </div>
      </div>

      <ContactForm />
    </>
  );
}
