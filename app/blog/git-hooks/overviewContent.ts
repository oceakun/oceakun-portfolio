import { OverviewTopic } from '../_components/Overview';

export const overviewContent: OverviewTopic[] = [
  {
    name: 'What Are Git Hooks?',
    scrollToId: 'what-are-git-hooks',
  },
  {
    name: 'Types of Git Hooks',
    scrollToId: 'types',
    subtopics: [
      { name: 'Client-Side Hooks', scrollToId: 'client-side' },
      { name: 'Server-Side Hooks', scrollToId: 'server-side' },
    ],
  },
  {
    name: 'Setting Up Your First Hook',
    scrollToId: 'first-hook',
    subtopics: [
      { name: 'Step 1: Create the Hook File', scrollToId: 'create-hook' },
      { name: 'Step 2: Make It Executable', scrollToId: 'make-executable' },
      { name: 'Step 3: Test It', scrollToId: 'test-hook' },
    ],
  },
  {
    name: 'Client-Side Hooks Deep Dive',
    scrollToId: 'client-deep-dive',
    subtopics: [
      {
        name: '1. pre-commit: Code Quality Gate',
        scrollToId: 'pre-commit',
      },
      {
        name: '2. commit-msg: Enforce Commit Message Standards',
        scrollToId: 'commit-msg',
      },
      {
        name: '3. pre-push: Final Safety Check',
        scrollToId: 'pre-push',
      },
      {
        name: '4. post-merge: Automatic Dependency Updates',
        scrollToId: 'post-merge',
      },
    ],
  },
  {
    name: 'Server-Side Hooks',
    scrollToId: 'server-hooks',
    subtopics: [
      {
        name: 'post-receive: Automated Deployment',
        scrollToId: 'post-receive',
      },
    ],
  },
  {
    name: 'Managing Hooks with Husky',
    scrollToId: 'husky',
    subtopics: [
      { name: 'Setup Husky', scrollToId: 'husky-setup' },
      {
        name: 'Husky + lint-staged: Only Lint Changed Files',
        scrollToId: 'lint-staged',
      },
      {
        name: 'Husky + commitlint: Enforce Commit Messages',
        scrollToId: 'commitlint',
      },
    ],
  },
  {
    name: 'Best Practices',
    scrollToId: 'best-practices',
    subtopics: [
      { name: '1. Keep Hooks Fast', scrollToId: 'keep-fast' },
      { name: '2. Make Hooks Portable', scrollToId: 'portable' },
      {
        name: '3. Provide Clear Error Messages',
        scrollToId: 'error-messages',
      },
      {
        name: '4. Version Control Your Hooks',
        scrollToId: 'version-control',
      },
    ],
  },
  {
    name: 'Bypassing Hooks (When and Why)',
    scrollToId: 'bypassing',
    subtopics: [
      { name: 'Skip Hooks', scrollToId: 'skip-hooks' },
      { name: 'When to Bypass', scrollToId: 'when-to-bypass' },
    ],
  },
  {
    name: 'Troubleshooting Common Issues',
    scrollToId: 'troubleshooting',
    subtopics: [
      { name: 'Hook Not Running', scrollToId: 'not-running' },
      {
        name: 'Hook Fails with "Command Not Found"',
        scrollToId: 'command-not-found',
      },
      {
        name: 'Hook Works Locally but Not for Team',
        scrollToId: 'team-sharing',
      },
    ],
  },
  {
    name: 'Real-World Example: Complete Setup',
    scrollToId: 'real-world',
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
