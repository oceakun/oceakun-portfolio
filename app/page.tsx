'use client';

import Image from 'next/image';
import {
  name,
  alias,
  about,
  bio,
  currentJob,
  prevJob,
  summary,
  avatar,
} from '../lib/info';
import Typewriter from 'typewriter-effect';

export const revalidate = 60;

export default async function HomePage() {
  return (
    <section>
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(
              `<span class="dark:text-yellow-200 text-rose-500">${name}</span>`
            )
            .pauseFor(2500)
            .deleteAll()
            .callFunction(() => {
              console.log('All strings were deleted');
            })
            .typeString(
              `<span class="dark:text-yellow-200 text-rose-500">${alias}</span>`
            )
            .pauseFor(2500)
            .deleteAll()
            .start();
        }}
      />
      <p className='mt-14 max-w-[460px] text-neutral-800 dark:text-neutral-200'>
        {about()}
      </p>
      <div className='flex items-start md:items-center my-8 flex-col md:flex-row'>
        <Image
          alt={name}
          className='grayscale-50 dark:grayscale shadow-lg shadow-rose-500/50 dark:shadow-lg dark:shadow-cyan-500/50'
          src={avatar}
          placeholder='blur'
          width={160}
          priority
        />
      </div>
      <p className='my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200'>
        {bio()}
      </p>
      <hr className='my-8 max-w-[600px] border-neutral-300 dark:border-neutral-700' />
      <p className='my-10 max-w-[600px] text-neutral-800 dark:text-neutral-200'>
        {currentJob()}
      </p>
      <hr className='my-8 max-w-[600px] border-neutral-300 dark:border-neutral-700' />
      <p className='my-10 max-w-[600px] text-neutral-800 dark:text-neutral-200'>
        {prevJob()}
      </p>
      <hr className='my-8 max-w-[600px] border-neutral-300 dark:border-neutral-700' />
      <p className='my-10 max-w-[600px] text-neutral-800 dark:text-neutral-200'>
        {summary()}
      </p>
    </section>
  );
}
