import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';
import CodeBlock from '../_components/CodeBlock';
import Overview from '../_components/Overview';
import References from '../_components/References';
import { overviewContent } from './overviewContent';
import { refs } from './references';

export const metadata: Metadata = {
  title: 'Debouncing, Deferring and Throttling',
  description:
    'Understanding the differences between debouncing, deferring, and throttling - performance optimization techniques for handling frequent events in JavaScript and React.',
  openGraph: {
    title: 'Debouncing, Deferring and Throttling',
    description:
      'Understanding the differences between debouncing, deferring, and throttling - performance optimization techniques for handling frequent events in JavaScript and React.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debouncing, Deferring and Throttling',
    description:
      'Understanding the differences between debouncing, deferring, and throttling - performance optimization techniques for handling frequent events in JavaScript and React.',
  },
};

export default function BlogPage() {
  return (
    <section className='w-full'>
      <BlogHeader
        title='Debouncing, Deferring and Throttling'
        date='04-12-2025'
      />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify w-full'>
        <div className='text-justify w-full'>
          <Overview topics={overviewContent} />

          <h2
            id='introduction'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            Introduction
          </h2>
          <p>
            In modern web development, we often deal with events that fire
            rapidly - scrolling, resizing, typing, mouse movements, and more.
            Without proper optimization, handling these events can lead to
            performance issues, excessive API calls, and a sluggish user
            experience. Three key techniques help us manage these scenarios:
            debouncing, throttling, and deferring.
          </p>

          <h2
            id='debouncing'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            What is Debouncing?
          </h2>
          <p>
            Debouncing is a technique that delays the execution of a function
            until after a certain amount of time has passed since the last time
            it was invoked. Think of it as "waiting for things to settle down"
            before taking action.
          </p>
          <p>
            <strong>Real-world analogy:</strong> Imagine an elevator. Instead of
            closing the doors immediately when someone presses the button, it
            waits a few seconds to see if anyone else is coming. Each time
            someone new approaches, the timer resets.
          </p>
          <p>
            <strong>Common use cases:</strong>
          </p>
          <ul>
            <li>
              <strong>Search input:</strong> Wait for the user to stop typing
              before sending a search query to the server
            </li>
            <li>
              <strong>Form validation:</strong> Validate input only after the
              user pauses typing
            </li>
            <li>
              <strong>Auto-save:</strong> Save draft content only after the user
              stops typing for a moment
            </li>
            <li>
              <strong>Window resize:</strong> Recalculate layouts only after the
              user finishes resizing the window
            </li>
          </ul>

          <h2
            id='throttling'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            What is Throttling?
          </h2>
          <p>
            Throttling ensures that a function is called at most once in a
            specified time period, regardless of how many times the event is
            triggered. It's about limiting the rate of execution.
          </p>
          <p>
            <strong>Real-world analogy:</strong> Think of a security turnstile
            at a stadium. No matter how many people are pushing to get through,
            it only allows one person through at a time, at a controlled rate.
          </p>
          <p>
            <strong>Common use cases:</strong>
          </p>
          <ul>
            <li>
              <strong>Scroll events:</strong> Update a progress indicator or
              lazy-load images at regular intervals while scrolling
            </li>
            <li>
              <strong>Mouse movement tracking:</strong> Track cursor position
              for analytics without overwhelming the system
            </li>
            <li>
              <strong>API rate limiting:</strong> Ensure you don't exceed API
              call limits
            </li>
            <li>
              <strong>Game loop updates:</strong> Limit rendering or physics
              calculations to a specific frame rate
            </li>
          </ul>

          <h2
            id='deferring'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            What is Deferring?
          </h2>
          <p>
            Deferring (or deferred values, particularly in React with{' '}
            <code>useDeferredValue</code>) is about deprioritizing updates to
            certain parts of the UI to keep the interface responsive. Unlike
            debouncing and throttling, which control when functions execute,
            deferring controls which updates React prioritizes during rendering.
          </p>
          <p>
            <strong>Real-world analogy:</strong> Imagine you're ordering at a
            restaurant during rush hour. The waiter takes your drink order first
            (high priority) and tells you the food will come shortly (deferred).
            This keeps you satisfied while the kitchen works on your meal.
          </p>
          <p>
            <strong>Common use cases:</strong>
          </p>
          <ul>
            <li>
              <strong>Search results:</strong> Keep the search input responsive
              while deferring the update of a large results list
            </li>
            <li>
              <strong>Heavy computations:</strong> Allow urgent UI updates to
              proceed while deferring expensive calculations
            </li>
            <li>
              <strong>Data visualization:</strong> Update interactive controls
              immediately while deferring complex chart re-renders
            </li>
            <li>
              <strong>Filtering large lists:</strong> Keep the filter input
              responsive while the filtered results update in the background
            </li>
          </ul>

          <h2
            id='key-differences'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            Key Differences
          </h2>
          <div className='overflow-x-auto'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr>
                  <th className='border dark:border-neutral-700 p-2'>
                    Technique
                  </th>
                  <th className='border dark:border-neutral-700 p-2'>
                    When Function Executes
                  </th>
                  <th className='border dark:border-neutral-700 p-2'>
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border dark:border-neutral-700 p-2'>
                    <strong>Debouncing</strong>
                  </td>
                  <td className='border dark:border-neutral-700 p-2'>
                    After events stop firing for X milliseconds
                  </td>
                  <td className='border dark:border-neutral-700 p-2'>
                    Waiting for "final" input (search, validation)
                  </td>
                </tr>
                <tr>
                  <td className='border dark:border-neutral-700 p-2'>
                    <strong>Throttling</strong>
                  </td>
                  <td className='border dark:border-neutral-700 p-2'>
                    At most once every X milliseconds
                  </td>
                  <td className='border dark:border-neutral-700 p-2'>
                    Regular updates during continuous action (scroll, resize)
                  </td>
                </tr>
                <tr>
                  <td className='border dark:border-neutral-700 p-2'>
                    <strong>Deferring</strong>
                  </td>
                  <td className='border dark:border-neutral-700 p-2'>
                    Immediately, but with lower priority
                  </td>
                  <td className='border dark:border-neutral-700 p-2'>
                    Keeping UI responsive during expensive updates
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2
            id='when-to-use'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            When to Use Each Technique
          </h2>
          <p>
            <strong>Use Debouncing when:</strong>
          </p>
          <ul>
            <li>
              You only care about the final state after a series of events
            </li>
            <li>
              You want to avoid intermediate executions (like API calls for each
              keystroke)
            </li>
            <li>The action is expensive and doesn't need real-time feedback</li>
          </ul>
          <p>
            <strong>Use Throttling when:</strong>
          </p>
          <ul>
            <li>
              You need consistent, periodic updates during continuous activity
            </li>
            <li>
              Real-time feedback is important, but you need to limit the rate
            </li>
            <li>
              You're tracking metrics or analytics where regular samples are
              sufficient
            </li>
          </ul>
          <p>
            <strong>Use Deferring when:</strong>
          </p>
          <ul>
            <li>
              You have UI updates of different priorities in the same component
            </li>
            <li>
              You want to keep interactive elements responsive during expensive
              renders
            </li>
            <li>
              You're working with React and want to leverage concurrent features
            </li>
          </ul>

          <h2
            id='implementation'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            Implementation Examples
          </h2>

          <h3
            id='debouncing-implementation'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            Debouncing Implementation
          </h3>
          <CodeBlock>{`// Vanilla JavaScript debounce
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage example
const searchAPI = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`)
    .then(res => res.json())
    .then(data => console.log(data));
}, 300);

// React custom hook
import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Using the hook
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Make API call
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}`}</CodeBlock>

          <h3
            id='throttling-implementation'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            Throttling Implementation
          </h3>
          <CodeBlock>{`// Vanilla JavaScript throttle
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage example
const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
  // Update scroll indicator
}, 100);

window.addEventListener('scroll', handleScroll);

// React custom hook
import { useEffect, useRef } from 'react';

function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
}

// Using the hook
function ScrollTracker() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useThrottle(() => {
    setScrollPosition(window.scrollY);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <div>Scroll position: {scrollPosition}px</div>;
}`}</CodeBlock>

          <h3
            id='deferring-implementation'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            Deferring Implementation (React)
          </h3>
          <CodeBlock>{`import { useDeferredValue, useState, memo } from 'react';

// Expensive list component
const SlowList = memo(({ items }) => {
  // Simulate expensive rendering
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1ms per item to emulate slow code
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
});

function SearchWithDeferredResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Filter based on deferred value
  const items = useMemo(() => {
    return largeDataset.filter(item =>
      item.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [deferredSearchTerm]);

  return (
    <div>
      {/* Input stays responsive */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
      />

      {/* Show loading indicator while deferred */}
      {searchTerm !== deferredSearchTerm && (
        <div>Loading...</div>
      )}

      {/* Expensive list renders with deferred value */}
      <SlowList items={items} />
    </div>
  );
}

// Alternative: Using useTransition for deferred state updates
function SearchWithTransition() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    // Urgent: update input immediately
    setSearchTerm(value);

    // Non-urgent: defer expensive state update
    startTransition(() => {
      // This update has lower priority
      setFilteredResults(filterData(value));
    });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      {isPending && <div>Updating results...</div>}
      <ResultsList results={filteredResults} />
    </div>
  );
}`}</CodeBlock>

          <h2
            id='conclusion'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            Conclusion
          </h2>
          <p>
            Understanding the differences between debouncing, throttling, and
            deferring is crucial for building performant web applications:
          </p>
          <ul>
            <li>
              <strong>Debounce</strong> when you want to wait for a pause in
              activity before taking action
            </li>
            <li>
              <strong>Throttle</strong> when you need regular, rate-limited
              updates during continuous activity
            </li>
            <li>
              <strong>Defer</strong> when you want to prioritize some UI updates
              over others in React applications
            </li>
          </ul>
          <p>
            Each technique serves a specific purpose, and often you might use
            multiple techniques in the same application for different scenarios.
            The key is understanding your requirements and choosing the right
            tool for the job. Remember that premature optimization can be
            counterproductive - measure performance first, then optimize where
            needed.
          </p>
        </div>
      </div>
      <div id='references'>
        <References refs={refs} />
      </div>
    </section>
  );
}
