'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

interface ContactFormProps {
  listingName?: string;
}

export default function ContactForm({ listingName }: ContactFormProps) {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      ...(listingName && { listing: listingName }),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed');

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      e.currentTarget.reset();
    } catch {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-brand-warm-light/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-page-black text-center mb-4">
            {t('title')}
          </h2>
          <div className="w-16 h-1 bg-brand-warm-dark rounded-full mx-auto mb-12" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {listingName && (
              <div>
                <label htmlFor="listing" className="block text-sm font-heading font-semibold text-page-black mb-1.5">
                  {t('listing')}
                </label>
                <input
                  id="listing"
                  name="listing"
                  type="text"
                  readOnly
                  value={listingName}
                  className="w-full px-4 py-3 rounded-brand border border-neutral-light bg-neutral-50 text-page-black cursor-not-allowed"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-heading font-semibold text-page-black mb-1.5">
                  {t('name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t('namePlaceholder')}
                  className="w-full px-4 py-3 rounded-brand border border-neutral-light bg-white text-page-black placeholder:text-neutral-light focus:outline-none focus:ring-2 focus:ring-brand-warm-dark/50 focus:border-brand-warm-dark transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-heading font-semibold text-page-black mb-1.5">
                  {t('email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-brand border border-neutral-light bg-white text-page-black placeholder:text-neutral-light focus:outline-none focus:ring-2 focus:ring-brand-warm-dark/50 focus:border-brand-warm-dark transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-heading font-semibold text-page-black mb-1.5">
                {t('phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder={t('phonePlaceholder')}
                className="w-full px-4 py-3 rounded-brand border border-neutral-light bg-white text-page-black placeholder:text-neutral-light focus:outline-none focus:ring-2 focus:ring-brand-warm-dark/50 focus:border-brand-warm-dark transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-heading font-semibold text-page-black mb-1.5">
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder={t('messagePlaceholder')}
                className="w-full px-4 py-3 rounded-brand border border-neutral-light bg-white text-page-black placeholder:text-neutral-light focus:outline-none focus:ring-2 focus:ring-brand-warm-dark/50 focus:border-brand-warm-dark transition-colors resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={sending}
                className="inline-block rounded-brand bg-brand-warm-dark px-10 py-3.5 font-heading font-semibold text-white hover:bg-brand-warm-dark/90 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? t('sending') : t('submit')}
              </button>
            </div>
          </form>

          {submitted && (
            <div className="mt-6 p-4 rounded-brand bg-green-50 border border-green-200 text-green-800 text-center font-heading text-sm">
              {t('success')}
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 rounded-brand bg-red-50 border border-red-200 text-red-800 text-center font-heading text-sm">
              {t('error')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
