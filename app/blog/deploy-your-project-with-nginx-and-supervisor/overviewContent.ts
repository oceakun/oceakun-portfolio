import { OverviewTopic } from '../_components/Overview';

export const overviewContent: OverviewTopic[] = [
  {
    name: 'Overview',
    scrollToId: 'overview',
  },
  {
    name: 'Prerequisites',
    scrollToId: 'prerequisites',
  },
  {
    name: 'Initial Server Setup',
    scrollToId: 'server-setup',
  },
  {
    name: 'Deploy Node.js API Backend',
    scrollToId: 'deploy-api',
    subtopics: [
      { name: '1. Setup API Application', scrollToId: 'api-setup' },
      { name: '2. Configure Supervisor for API', scrollToId: 'api-supervisor' },
      { name: '3. Configure nginx for API', scrollToId: 'api-nginx' },
      { name: '4. Start API Services', scrollToId: 'api-start' },
    ],
  },
  {
    name: 'Deploy React SSR Application',
    scrollToId: 'deploy-ssr',
    subtopics: [
      { name: '1. Setup React Application', scrollToId: 'ssr-setup' },
      {
        name: '2. Configure Supervisor for SSR',
        scrollToId: 'ssr-supervisor',
      },
      { name: '3. Configure nginx for React SSR', scrollToId: 'ssr-nginx' },
      { name: '4. Start Frontend Services', scrollToId: 'ssr-start' },
    ],
  },
  {
    name: 'SSL Configuration',
    scrollToId: 'ssl',
  },
  {
    name: 'Deployment Workflow',
    scrollToId: 'deployment-workflow',
    subtopics: [
      { name: 'Updating API', scrollToId: 'updating-api' },
      { name: 'Updating React SSR App', scrollToId: 'updating-ssr' },
    ],
  },
  {
    name: 'Monitoring and Troubleshooting',
    scrollToId: 'monitoring',
    subtopics: [
      { name: 'Check Service Status', scrollToId: 'service-status' },
      { name: 'Common Issues', scrollToId: 'common-issues' },
    ],
  },
  {
    name: 'References',
    scrollToId: 'references',
  },
];
