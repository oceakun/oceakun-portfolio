'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
  altPrefix: string;
}

export default function Carousel({ images, altPrefix }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className='relative w-full max-w-3xl mx-auto mb-6 group'>
      {/* Main Image Container */}
      <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900'>
        <Image
          src={images[currentIndex]}
          alt={`${altPrefix} - Image ${currentIndex + 1}`}
          fill
          className='object-contain'
          sizes='(max-width: 768px) 100vw, 768px'
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className='absolute left-2 top-1/2 -translate-y-1/2 bg-neutral-800/70 hover:bg-neutral-700/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
            aria-label='Previous image'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-800/70 hover:bg-neutral-700/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
            aria-label='Next image'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-rose-500 dark:bg-yellow-200 w-6'
                  : 'bg-neutral-400 dark:bg-neutral-600 hover:bg-neutral-500'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className='absolute top-3 right-3 bg-neutral-800/70 text-white text-xs px-2 py-1 rounded'>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
