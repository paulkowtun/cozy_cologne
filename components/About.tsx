'use client';

import { useTranslations } from 'next-intl';

const icons = [
  // Sofa icon for fully furnished
  <svg key="furnished" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  // Star icon for quality
  <svg key="quality" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  // Wrench icon for renovated
  <svg key="renovated" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" /></svg>,
  // Users icon for flat share
  <svg key="flatshare" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
];

export default function About() {
  const t = useTranslations('about');

  const points = [
    { icon: icons[0], text: t('point1') },
    { icon: icons[1], text: t('point2') },
    { icon: icons[2], text: t('point3') },
    { icon: icons[3], text: t('point4') },
  ];

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="fade-in">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-page-black mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-neutral-dark leading-relaxed mb-10">
              {t('text')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {points.map((point, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-brand bg-brand-warm-light flex items-center justify-center text-brand-warm-dark">
                    {point.icon}
                  </div>
                  <p className="font-heading font-medium text-page-black pt-2">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative visual */}
          <div className="fade-in relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-warm-dark to-brand-warm-light flex items-center justify-center">
              <div className="text-center text-white p-8">
                <span className="font-heading text-5xl sm:text-6xl font-bold block mb-2">
                  <span className="relative inline-block">
                    cozy!
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-full" />
                  </span>
                </span>
                <span className="font-heading text-3xl sm:text-4xl font-light block">cologne</span>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-brand bg-brand-warm-light -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
