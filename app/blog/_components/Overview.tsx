'use client';

import React, { useCallback } from 'react';

interface OverviewSubTopic {
  name: string;
  scrollToId: string;
}

export interface OverviewTopic {
  name: string;
  scrollToId: string;
  subtopics?: OverviewSubTopic[];
}

interface OverviewProps {
  topics: OverviewTopic[];
}

function Overview({ topics }: OverviewProps) {
  const scrollToSection = useCallback((id: string) => {
    // Check if we're on client side
    if (typeof window === 'undefined') return;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update URL without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  }, []);

  return (
    <div className='mb-8 w-full '>
      <h2 className='text-xl dark:text-neutral-200 font-serif mb-4 w-full'>
        Content
      </h2>
      <div className='space-y-2 bg-gray-100 dark:bg-stone-800 py-2 w-full rounded-lg'>
        {topics.map((topic) => (
          <div key={topic.scrollToId} className='ml-4'>
            {/* Main topic */}
            <button
              onClick={() => scrollToSection(topic.scrollToId)}
              className='text-left hover:underline cursor-pointer font-medium dark:text-neutral-200 text-neutral-800'
              type='button'
            >
              {topic.name}
            </button>

            {/* Subtopic list if exists */}
            {topic.subtopics && topic.subtopics.length > 0 && (
              <ul className='mt-2 space-y-1 ml-6'>
                {topic.subtopics.map((subtopic) => (
                  <li key={subtopic.scrollToId}>
                    <button
                      onClick={() => scrollToSection(subtopic.scrollToId)}
                      className='text-left hover:underline cursor-pointer text-sm dark:text-neutral-300 text-neutral-700'
                      type='button'
                    >
                      {subtopic.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
