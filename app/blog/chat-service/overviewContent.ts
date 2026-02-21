import { OverviewTopic } from '../_components/Overview';

export const overviewContent: OverviewTopic[] = [
  {
    name: 'Introduction: Chat API Fundamentals',
    scrollToId: 'introduction',
  },
  {
    name: 'Architecture Overview',
    scrollToId: 'architecture',
  },
  {
    name: 'WebSocket vs Long Polling vs Server-Sent Events',
    scrollToId: 'websocket-vs',
    subtopics: [
      { name: 'WebSockets', scrollToId: 'websockets' },
      { name: 'Long Polling', scrollToId: 'long-polling' },
      { name: 'Server-Sent Events (SSE)', scrollToId: 'sse' },
    ],
  },
  {
    name: 'Building the Core: Connection Management',
    scrollToId: 'connection-management',
    subtopics: [
      { name: 'Connection Lifecycle', scrollToId: 'connection-lifecycle' },
      { name: 'Heartbeat and Reconnection', scrollToId: 'heartbeat' },
    ],
  },
  {
    name: 'Message Delivery Guarantees',
    scrollToId: 'delivery-guarantees',
    subtopics: [
      {
        name: 'Implementing At-Least-Once Delivery',
        scrollToId: 'at-least-once',
      },
      { name: 'Handling Offline Users', scrollToId: 'offline-users' },
    ],
  },
  {
    name: 'Database Schema and Message Storage',
    scrollToId: 'database-schema',
  },
  {
    name: 'Scaling Horizontally with Redis Pub/Sub',
    scrollToId: 'redis-scaling',
    subtopics: [
      { name: 'Presence System with Redis', scrollToId: 'presence-redis' },
    ],
  },
  {
    name: 'Rate Limiting and Security',
    scrollToId: 'rate-limiting',
    subtopics: [
      { name: 'Per-User Rate Limiting', scrollToId: 'per-user-rate' },
      {
        name: 'Input Validation and Sanitization',
        scrollToId: 'input-validation',
      },
    ],
  },
  {
    name: 'Monitoring and Observability',
    scrollToId: 'monitoring',
  },
  {
    name: 'Production Deployment Considerations',
    scrollToId: 'production',
    subtopics: [
      { name: 'Load Balancing', scrollToId: 'load-balancing' },
      { name: 'Graceful Shutdown', scrollToId: 'graceful-shutdown' },
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
