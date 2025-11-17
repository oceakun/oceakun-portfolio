import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';

export const metadata: Metadata = {
  title: 'Deploy your project with nginx and supervisor',
  description:
    'A comprehensive guide to deploying your project using nginx as a reverse proxy and supervisor for process management.',
  openGraph: {
    title: 'Deploy your project with nginx and supervisor',
    description:
      'A comprehensive guide to deploying your project using nginx as a reverse proxy and supervisor for process management.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deploy your project with nginx and supervisor',
    description:
      'A comprehensive guide to deploying your project using nginx as a reverse proxy and supervisor for process management.',
  },
};

export default function BlogPage() {
  return (
    <section>
      <BlogHeader
        title='Deploy your project with nginx and supervisor'
        date='11-11-2025'
      />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Content</h2>
          <ul>
            <li>Introduction</li>
            <li>Setting up nginx</li>
            <li>Configuring supervisor</li>
            <li>Deployment best practices</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Introduction
          </h2>
          <p>
            Deploying a web application to production requires more than just
            running your code on a server. You need a reliable way to manage
            your application process and serve requests efficiently. This is
            where nginx and supervisor come in.
          </p>
          <p>
            nginx acts as a reverse proxy, handling incoming HTTP requests and
            forwarding them to your application. supervisor ensures your
            application stays running, automatically restarting it if it
            crashes.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Setting up nginx
          </h2>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Configuring supervisor
          </h2>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Deployment best practices
          </h2>
          <p>
            <em>Content coming soon...</em>
          </p>
        </div>
      </div>
    </section>
  );
}
