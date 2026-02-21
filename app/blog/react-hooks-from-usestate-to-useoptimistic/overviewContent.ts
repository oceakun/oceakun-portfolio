import { OverviewTopic } from '../_components/Overview';

export const overviewContent: OverviewTopic[] = [
  {
    name: 'Introduction',
    scrollToId: 'introduction',
    subtopics: [
      { name: 'The ones, most commonly used', scrollToId: 'commonly-used' },
      { name: 'Less popular, yet powerful', scrollToId: 'less-popular' },
      { name: 'A running example', scrollToId: 'running-example' },
    ],
  },
  {
    name: 'Diving in',
    scrollToId: 'diving-in',
    subtopics: [
      { name: 'useState - Managing component state', scrollToId: 'useState' },
      {
        name: 'useCallback - Memoizing function references',
        scrollToId: 'useCallback',
      },
      {
        name: 'useMemo - Caching expensive calculations',
        scrollToId: 'useMemo',
      },
      { name: 'useContext - Global state sharing', scrollToId: 'useContext' },
      {
        name: 'useEffect - Side effects and synchronization',
        scrollToId: 'useEffect',
      },
      {
        name: 'useDeferredValue - Non-blocking UI updates',
        scrollToId: 'useDeferredValue',
      },
      {
        name: 'useLayoutEffect - Synchronous DOM updates',
        scrollToId: 'useLayoutEffect',
      },
      {
        name: 'useInsertionEffect - CSS injection before paint',
        scrollToId: 'useInsertionEffect',
      },
      {
        name: 'useRef - Persisting values and DOM access',
        scrollToId: 'useRef',
      },
      {
        name: 'useImperativeHandle - Custom ref APIs',
        scrollToId: 'useImperativeHandle',
      },
      { name: 'useId - Stable unique IDs', scrollToId: 'useId' },
      {
        name: 'useTransition - Mark non-urgent updates',
        scrollToId: 'useTransition',
      },
      {
        name: 'useOptimistic - Instant UI updates with rollback',
        scrollToId: 'useOptimistic',
      },
    ],
  },
  {
    name: 'A few things to note',
    scrollToId: 'things-to-note',
  },
  {
    name: 'References',
    scrollToId: 'references',
  },
];
