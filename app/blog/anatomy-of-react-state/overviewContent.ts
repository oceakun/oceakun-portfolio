import { OverviewTopic } from '../_components/Overview';

export const overviewContent: OverviewTopic[] = [
  {
    name: 'Introduction: What is State?',
    scrollToId: 'introduction',
  },
  {
    name: 'The React Fiber Architecture',
    scrollToId: 'fiber-architecture',
  },
  {
    name: 'How useState Works Under the Hood',
    scrollToId: 'usestate-internals',
  },
  {
    name: 'State Updates and Batching',
    scrollToId: 'state-updates-batching',
    subtopics: [
      {
        name: 'Synchronous vs Asynchronous Updates',
        scrollToId: 'sync-vs-async',
      },
    ],
  },
  {
    name: 'Reconciliation and Re-renders',
    scrollToId: 'reconciliation',
    subtopics: [
      { name: 'What Triggers Re-renders?', scrollToId: 'triggers-rerenders' },
    ],
  },
  {
    name: 'State vs Props: When to Use What',
    scrollToId: 'state-vs-props',
  },
  {
    name: 'Common Pitfalls and Anti-patterns',
    scrollToId: 'pitfalls',
    subtopics: [
      { name: 'Stale Closures', scrollToId: 'stale-closures' },
      { name: 'Derived State', scrollToId: 'derived-state' },
      {
        name: 'Initializing State from Props',
        scrollToId: 'initializing-from-props',
      },
    ],
  },
  {
    name: 'State Colocation and Lifting State Up',
    scrollToId: 'colocation',
    subtopics: [
      {
        name: "Colocation: Keep State Close to Where It's Used",
        scrollToId: 'colocation-close',
      },
      {
        name: 'Lifting State Up: Share State Between Siblings',
        scrollToId: 'lifting-state',
      },
    ],
  },
  {
    name: 'Performance Optimization Techniques',
    scrollToId: 'performance',
    subtopics: [
      { name: 'Lazy Initial State', scrollToId: 'lazy-initial-state' },
      { name: 'Bail Out of Updates', scrollToId: 'bail-out' },
      { name: 'State Splitting', scrollToId: 'state-splitting' },
    ],
  },
  {
    name: 'The Mental Model',
    scrollToId: 'mental-model',
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
