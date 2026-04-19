import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  date: string;
  wordCount?: number;
}

function Header({ title, date, wordCount }: HeaderProps) {
  const readTime = wordCount ? Math.max(1, Math.ceil(wordCount / 200)) : null;

  return (
    <div className='w-full'>
      {/* <h1 className='font-bold text-2xl dark:text-neutral-200 font-serif text-left'>
        {title}
      </h1> */}
      <p className='w-full flex flex-row justify-between items-center mt-12'>
        <span className='font-[300] text-[14px] dark:text-amber-300 text-rose-500 flex flex-col sm:flex-row sm:items-center'>
          {date ? (
            <>
              <span>{date}</span>
              {wordCount != null && (
                <>
                  <span className='my-1 h-px w-8 bg-current sm:my-0 sm:mx-2 sm:h-4 sm:w-px' />
                  <span>{wordCount} words</span>
                  <span className='my-1 h-px w-8 bg-current sm:my-0 sm:mx-2 sm:h-4 sm:w-px' />
                  <span>{readTime} min read</span>
                </>
              )}
            </>
          ) : (
            '----------'
          )}
        </span>
        <Link
          href='/blog'
          className='group dark:text-amber-300 text-rose-500 hover:cursor-pointer no-underline font-[300] inline-flex items-center justify-center transition-all duration-300 relative px-3 py-1.5 rounded-md shadow-[0_2px_8px_rgba(244,63,94,0.3)] hover:shadow-[0_4px_20px_rgba(244,63,94,0.6)] dark:shadow-[0_2px_8px_rgba(254,240,138,0.3)] dark:hover:shadow-[0_4px_20px_rgba(254,240,138,0.6)]'
        >
          {/* Arrow - positioned absolutely */}
          <span className='absolute left-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100'>
            ←
          </span>
          {/* Back text */}
          <span className='transition-all duration-500 group-hover:ml-5'>
            Back
          </span>
        </Link>
      </p>
    </div>
  );
}

export default Header;
