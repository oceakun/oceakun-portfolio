import { OverviewTopic } from '../_components/Overview';

export const overviewContent: OverviewTopic[] = [
  {
    name: 'Introduction',
    scrollToId: 'introduction',
  },
  {
    name: 'What is Debouncing?',
    scrollToId: 'debouncing',
  },
  {
    name: 'What is Throttling?',
    scrollToId: 'throttling',
  },
  {
    name: 'What is Deferring?',
    scrollToId: 'deferring',
  },
  {
    name: 'Key Differences',
    scrollToId: 'key-differences',
  },
  {
    name: 'When to Use Each Technique',
    scrollToId: 'when-to-use',
  },
  {
    name: 'Implementation Examples',
    scrollToId: 'implementation',
    subtopics: [
      {
        name: 'Debouncing Implementation',
        scrollToId: 'debouncing-implementation',
      },
      {
        name: 'Throttling Implementation',
        scrollToId: 'throttling-implementation',
      },
      {
        name: 'Deferring Implementation (React)',
        scrollToId: 'deferring-implementation',
      },
    ],
  },
  {
    name: 'Conclusion',
    scrollToId: 'conclusion',
  },
  {
    name: 'References',
    scrollToId: 'references',
  },
];
