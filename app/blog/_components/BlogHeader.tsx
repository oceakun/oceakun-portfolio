import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  date: string;
}

function Header({ title, date }: HeaderProps) {
  return (
    <div>
      <h1 className='font-bold text-2xl dark:text-neutral-200 font-serif text-left'>
        {title}
      </h1>
      <p className='w-full flex flex-row justify-between items-center mt-12'>
        <span className='font-[300] text-[14px] dark:text-yellow-200 text-rose-500'>
          {date ? (
            <>
              <span className='font-[300] text-[12px] dark:text-yellow-200 text-rose-500 italic'>
                (Last Updated on)
              </span>{' '}
              {date}
            </>
          ) : (
            '----------'
          )}
        </span>
        <Link
          href='/blog'
          className='group dark:text-yellow-200 text-rose-500 hover:cursor-pointer no-underline font-[300] inline-flex items-center justify-center transition-all duration-300 relative px-3 py-1.5 rounded-md shadow-[0_2px_8px_rgba(244,63,94,0.3)] hover:shadow-[0_4px_20px_rgba(244,63,94,0.6)] dark:shadow-[0_2px_8px_rgba(254,240,138,0.3)] dark:hover:shadow-[0_4px_20px_rgba(254,240,138,0.6)]'
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
