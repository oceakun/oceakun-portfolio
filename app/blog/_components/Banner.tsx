import React from 'react';
import Image from 'next/image';
import bannerImg from '../../banner.png';

interface BannerProps {
  title: string;
  subtitle?: string;
}

function Banner({ title, subtitle }: BannerProps) {
  return (
    <div
      className='relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden flex items-center'
      style={{
        background:
          'radial-gradient(ellipse at center, #3b1a1a 0%, #1a0a0a 60%, #0d0505 100%)',
      }}
    >
      <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full px-8 md:px-12 gap-4 sm:gap-8'>
        <Image
          src={bannerImg}
          alt='Banner mascot'
          width={100}
          height={100}
          className='shrink-0'
        />
        <div className='text-center sm:text-left'>
          <h1
            className='text-3xl md:text-5xl font-bold tracking-wide uppercase'
            style={{
              color: '#e87c2a',
              fontFamily: 'var(--font-creepster), cursive',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className='mt-4 text-lg md:text-2xl tracking-wider'
              style={{
                color: '#dc916bff',
                fontFamily: 'var(--font-roboto), sans-serif',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
