import React from 'react';

interface BannerProps {
  title: string;
  subtitle?: string;
}

function Banner({ title, subtitle }: BannerProps) {
  return (
    <div className='relative w-full rounded-lg overflow-hidden flex items-center'>
      <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full gap-4 sm:gap-8'>
        <div className='text-center sm:text-left'>
          <h1 className='text-3xl md:text-5xl font-bold tracking-wide uppercase font-amber-950 dark:text-neutral-200 font-serif'>
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Banner;
