import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';

export const metadata: Metadata = {
  title: 'SSR and Server Components',
  description:
    'A deep dive into Server-Side Rendering (SSR) and React Server Components in Next.js, understanding their differences, use cases, and implementation patterns.',
  openGraph: {
    title: 'SSR and Server Components',
    description:
      'A deep dive into Server-Side Rendering (SSR) and React Server Components in Next.js, understanding their differences, use cases, and implementation patterns.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSR and Server Components',
    description:
      'A deep dive into Server-Side Rendering (SSR) and React Server Components in Next.js, understanding their differences, use cases, and implementation patterns.',
  },
};

export default function BlogPage() {
  return (
    <section>
      <BlogHeader title='SSR and Server Components' date='11-11-2025' />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Content</h2>
          <ul>
            <li>Introduction to rendering patterns</li>
            <li>What is Server-Side Rendering (SSR)?</li>
            <li>Understanding React Server Components (RSC)</li>
            <li>SSR vs Server Components: Key differences</li>
            <li>When to use SSR vs Server Components</li>
            <li>Implementation in Next.js</li>
            <li>Best practices and common pitfalls</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Introduction to rendering patterns
          </h2>
          <p>
            Modern web applications have evolved significantly in how they
            render content. From traditional server-side rendering to
            client-side rendering with SPAs, and now back to the server with
            React Server Components, understanding these patterns is crucial for
            building performant applications.
          </p>
          <p>
            This article explores two important concepts in the React and
            Next.js ecosystem: Server-Side Rendering (SSR) and React Server
            Components (RSC). While they may sound similar, they serve different
            purposes and solve different problems.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            What is Server-Side Rendering (SSR)?
          </h2>
          <p>
            Server-Side Rendering is a technique where HTML is generated on the
            server for each request. Instead of sending a blank HTML page with
            JavaScript that renders content on the client, SSR sends a fully
            rendered HTML page to the browser.
          </p>
          <p>Key characteristics of SSR:</p>
          <ul>
            <li>HTML is generated on the server for each request</li>
            <li>Improves initial page load performance and SEO</li>
            <li>Components still hydrate on the client side</li>
            <li>
              All component code is sent to the client as JavaScript bundles
            </li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Understanding React Server Components (RSC)
          </h2>
          <p>
            React Server Components are a new paradigm introduced by React that
            allows components to run exclusively on the server. Unlike SSR,
            where components are rendered on the server but still shipped to the
            client for hydration, Server Components never make it to the client
            bundle.
          </p>
          <p>Key characteristics of Server Components:</p>
          <ul>
            <li>Components run only on the server</li>
            <li>Zero JavaScript sent to the client for these components</li>
            <li>
              Can directly access backend resources (databases, file systems)
            </li>
            <li>
              Cannot use client-side features like useState, useEffect, or event
              handlers
            </li>
            <li>Work alongside Client Components in a single application</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            SSR vs Server Components: Key differences
          </h2>
          <p>
            While both SSR and Server Components involve server-side rendering,
            they are fundamentally different:
          </p>
          <ul>
            <li>
              <strong>JavaScript bundle:</strong> SSR sends all component code
              to the client; Server Components keep code on the server
            </li>
            <li>
              <strong>Hydration:</strong> SSR requires hydration on the client;
              Server Components don't hydrate
            </li>
            <li>
              <strong>Interactivity:</strong> SSR components can be interactive
              after hydration; Server Components are static and non-interactive
            </li>
            <li>
              <strong>Backend access:</strong> SSR can access backend during
              render but needs API routes for client updates; Server Components
              can directly access backend resources
            </li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            When to use SSR vs Server Components
          </h2>
          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Use SSR when:
          </h3>
          <ul>
            <li>
              You need server-rendered pages with client-side interactivity
            </li>
            <li>SEO is critical and content needs to be crawlable</li>
            <li>
              Working with Next.js pages router or traditional SSR frameworks
            </li>
            <li>You need dynamic data fetching per request</li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Use Server Components when:
          </h3>
          <ul>
            <li>You want to reduce JavaScript bundle size</li>
            <li>Components don't need client-side interactivity</li>
            <li>You need direct access to backend resources</li>
            <li>Building with Next.js 13+ App Router</li>
            <li>Optimizing for performance and Core Web Vitals</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Implementation in Next.js
          </h2>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Best practices and common pitfalls
          </h2>
          <p>
            <em>Content coming soon...</em>
          </p>
        </div>
      </div>
    </section>
  );
}
