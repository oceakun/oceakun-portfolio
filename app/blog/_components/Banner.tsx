import React from 'react';

interface BannerProps {
  title: string;
  date: string;
  wordCount?: number;
}

function Banner({ title, date, wordCount }: BannerProps) {
  const readTime = wordCount ? Math.max(1, Math.ceil(wordCount / 200)) : null;

  return (
    <div className='relative w-full rounded-lg overflow-hidden flex items-center'>
      <div className='flex flex-col w-full gap-3'>
        <h1 className='text-2xl md:text-4xl font-bold tracking-wide font-amber-950 dark:text-neutral-200 font-serif'>
          {title}
        </h1>
        <p className='w-full flex flex-row items-center'>
          <span className='font-[300] text-[14px] dark:text-amber-300 text-amber-950 flex flex-row items-center gap-2'>
            {date ? (
              <>
                <span>{date}</span>
                {wordCount != null && (
                  <>
                    <span className='h-px w-4 bg-current sm:h-4 sm:w-px' />
                    <span>{wordCount} words</span>
                    <span className='h-px w-4 bg-current sm:h-4 sm:w-px' />
                    <span>{readTime} min read</span>
                  </>
                )}
              </>
            ) : (
              '----------'
            )}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Banner;
