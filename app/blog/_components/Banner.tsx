import Image from 'next/image';
import React from 'react';

interface Banner {
  src: string;
  alt: string;
}

function Banner({ src, alt }: Banner) {
  return (
    <div className='relative w-full h-64 md:h-96 mb-8'>
      <Image
        src={src}
        alt={alt}
        fill
        className='object-cover rounded-lg'
        priority
      />
    </div>
  );
}

export default Banner;
