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
    <>
      <h1 className='text-xl font-serif'>References</h1>
      <ul>
        {refs.map((ref, i) => {
          return (
            <li key={i}>
              <Link className='font-[200]' href={ref.url}>
                {ref.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default References;
