import React from 'react';
import Link from 'next/link';

interface ReferenceObject {
  name: string;
  url: string;
}

interface ReferencesProps {
  refs: ReferenceObject[];
}

function References({ refs }: ReferencesProps) {
  return (
    <div className='mt-8 text-neutral-800 dark:text-neutral-300 w-full'>
      <h1 className='text-xl font-serif mb-4'>References</h1>
      <ol className='list-decimal pl-6 space-y-2'>
        {refs.map((ref, i) => (
          <li key={i}>
            <Link
              href={ref.url}
              className='font-[200] hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              {ref.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default References;
