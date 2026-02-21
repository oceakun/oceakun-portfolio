import { OverviewTopic } from '../_components/Overview';

export const overviewContent: OverviewTopic[] = [
  {
    name: 'Introduction',
    scrollToId: 'introduction',
  },
  {
    name: 'Architecture Overview',
    scrollToId: 'architecture',
  },
  {
    name: 'Prerequisites',
    scrollToId: 'prerequisites',
  },
  {
    name: 'Part 1: Setting Up S3 for Static Frontend Hosting',
    scrollToId: 's3-setup',
    subtopics: [
      { name: 'Step 1: Create an S3 Bucket', scrollToId: 's3-create' },
      {
        name: 'Step 2: Configure Bucket for Static Website Hosting',
        scrollToId: 's3-configure',
      },
      { name: 'Step 3: Set Bucket Policy', scrollToId: 's3-policy' },
      {
        name: 'Step 4: Build and Upload Your Frontend',
        scrollToId: 's3-upload',
      },
    ],
  },
  {
    name: 'Part 2: Configuring CloudFront for CDN',
    scrollToId: 'cloudfront',
    subtopics: [
      {
        name: 'Step 1: Create CloudFront Distribution',
        scrollToId: 'cf-create',
      },
      {
        name: 'Step 2: Configure Error Pages for SPA Routing',
        scrollToId: 'cf-errors',
      },
      { name: 'Step 3: Request SSL Certificate', scrollToId: 'cf-ssl' },
    ],
  },
  {
    name: 'Part 3: Deploying Lambda Functions for Backend',
    scrollToId: 'lambda',
    subtopics: [
      {
        name: 'Step 1: Create a Lambda Function',
        scrollToId: 'lambda-create',
      },
      { name: 'Step 2: Deploy Lambda Function', scrollToId: 'lambda-deploy' },
      { name: 'Step 3: Set Up API Gateway', scrollToId: 'lambda-gateway' },
    ],
  },
  {
    name: 'Part 4: Connecting Frontend to Lambda API',
    scrollToId: 'connecting',
    subtopics: [
      {
        name: 'Environment Variables for Frontend',
        scrollToId: 'env-vars',
      },
      { name: 'API Service Implementation', scrollToId: 'api-service' },
    ],
  },
  {
    name: 'Setting Up Custom Domain with Route 53',
    scrollToId: 'route53',
  },
  {
    name: 'Best Practices and Optimization',
    scrollToId: 'best-practices',
    subtopics: [
      {
        name: '1. CloudFront Caching Strategy',
        scrollToId: 'caching',
      },
      { name: '2. Lambda Optimization', scrollToId: 'lambda-optimization' },
      { name: '3. Security Best Practices', scrollToId: 'security' },
      {
        name: '4. Deployment Automation',
        scrollToId: 'deployment-automation',
      },
    ],
  },
  {
    name: 'Cost Considerations',
    scrollToId: 'cost',
  },
  {
    name: 'Troubleshooting Common Issues',
    scrollToId: 'troubleshooting',
    subtopics: [
      {
        name: '1. SPA Routes Return 403/404',
        scrollToId: 'troubleshoot-spa',
      },
      { name: '2. CORS Errors', scrollToId: 'troubleshoot-cors' },
      { name: '3. Lambda Cold Starts', scrollToId: 'troubleshoot-cold' },
      {
        name: '4. CloudFront Shows Old Content',
        scrollToId: 'troubleshoot-cache',
      },
      {
        name: '5. Lambda Timeout Errors',
        scrollToId: 'troubleshoot-timeout',
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
