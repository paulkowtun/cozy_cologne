'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKoAk//Z';

interface ListingGalleryProps {
  images: string[];
  name: string;
}

export default function ListingGallery({ images, name }: ListingGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      setActiveIndex((i) =>
        direction === 'next'
          ? (i + 1) % images.length
          : (i - 1 + images.length) % images.length
      );
    },
    [images.length]
  );

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-2xl bg-brand-warm-light flex items-center justify-center">
        <span className="text-brand-warm-dark font-heading text-lg">No images available</span>
      </div>
    );
  }

  return (
    <>
      {/* Main image */}
      <div
        className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-warm-light cursor-pointer group"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[activeIndex]}
          alt={`${name} - Image ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-page-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </span>
        </div>
        {/* Image counter */}
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-heading">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all ${
                i === activeIndex
                  ? 'ring-2 ring-brand-warm-dark ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          {images.length > 1 && (
            <button
              className="absolute left-4 text-white/80 hover:text-white z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate('prev');
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full max-w-5xl max-h-[90vh] aspect-[16/9] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${name} - Image ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 text-white/80 hover:text-white z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate('next');
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <span className="absolute bottom-4 text-white/80 text-sm font-heading">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
