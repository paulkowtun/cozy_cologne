import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('datenschutz');
  return { title: `${t('title')} — cozy! cologne` };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('datenschutz');

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-page-black mb-8">
          {t('title')}
        </h1>
        <div className="prose prose-neutral max-w-none">
          {t('content')
            .split('\n')
            .map((line, i) => (
              <p key={i} className="text-neutral-dark leading-relaxed mb-2">
                {line}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
