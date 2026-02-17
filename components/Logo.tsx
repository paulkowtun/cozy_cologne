'use client';

import { Link } from '@/i18n/navigation';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`} aria-label="cozy! cologne home">
      <span className="font-heading text-2xl font-bold tracking-tight text-page-black">
        <span className="relative inline-block">
          cozy!
          <span
            className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-warm-dark rounded-full"
            aria-hidden="true"
          />
        </span>{' '}
        <span className="text-brand-warm-dark">cologne</span>
      </span>
    </Link>
  );
}
