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
      <p className='w-full flex flex-row justify-between items-end mt-12'>
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
          className='dark:text-yellow-200 text-rose-500 hover:cursor-pointer no-underline font-[300]'
        >
          <span>Back</span>
        </Link>
      </p>
    </div>
  );
}

export default Header;
