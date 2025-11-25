import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  name,
  alias,
  about,
  bio,
  currentJob,
  summary,
  avatar,
} from '../lib/info';
import { GitHubIcon, XIcon, LinkedinIcon } from '../components/icons';

const TypewriterClient = dynamic(
  () => import('../components/TypewriterClient'),
  {
    ssr: false,
    loading: () => (
      <div className='dark:text-yellow-200 text-rose-500'>{name}</div>
    ),
  }
);

export const revalidate = 60;

export default async function HomePage() {
  return (
    <section>
      <div className='min-h-[2.5rem]'>
        <TypewriterClient name={name} alias={alias} />
      </div>
      <div className='mt-10 flex flex-row gap-4 items-center'>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://github.com/oceakun'
          className='text-neutral-800 dark:text-neutral-200'
        >
          <GitHubIcon />
        </a>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://www.linkedin.com/in/sagar-deep/'
          className='text-neutral-800 dark:text-neutral-200'
        >
          <LinkedinIcon />
        </a>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://twitter.com/oceakun'
          className='text-neutral-800 dark:text-neutral-200'
        >
          <XIcon />
        </a>
      </div>
      <p className='mt-5 max-w-[460px] text-neutral-800 dark:text-neutral-200'>
        {about()}
      </p>
      <div className='flex items-start md:items-center my-6 flex-col md:flex-row'>
        <Image
          alt={name}
          className='grayscale-50 dark:grayscale shadow-lg shadow-rose-500/50 dark:shadow-lg dark:shadow-cyan-500/50'
          src={avatar}
          placeholder='blur'
          width={160}
          priority
        />
      </div>
      {/* <hr className='my-8 max-w-[600px] border-neutral-300 dark:border-neutral-700' /> */}
      <br />
      <p className='max-w-[600px] text-neutral-800 dark:text-neutral-200'>
        {bio()}
      </p>
      {/* <hr className='my-8 max-w-[600px] border-neutral-300 dark:border-neutral-700' /> */}
      <br />
      <p className='max-w-[600px] text-neutral-800 dark:text-neutral-200'>
        {currentJob()}
      </p>
      {/* <hr className='my-8 max-w-[600px] border-neutral-300 dark:border-neutral-700' /> */}
      {/* <p className='my-10 max-w-[600px] text-neutral-800 dark:text-neutral-200'>
        {summary()}
      </p> */}
    </section>
  );
}
