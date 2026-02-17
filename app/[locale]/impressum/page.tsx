import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('impressum');
  return { title: `${t('title')} — cozy! cologne` };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('impressum');

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-page-black mb-8">
          {t('title')}
        </h1>
        <div className="max-w-none space-y-1">
          {t('content')
            .split('\n')
            .map((line, i) => {
              if (!line.trim()) return <div key={i} className="h-4" />;
              const isHeading = line.endsWith(':');
              return isHeading ? (
                <h2 key={i} className="font-heading font-bold text-page-black text-lg mt-6 mb-1">
                  {line}
                </h2>
              ) : (
                <p key={i} className="text-neutral-dark leading-relaxed">
                  {line}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}
