import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';

export const metadata: Metadata = {
  title: 'Deploy Your Full-Stack Application with S3, CloudFront and Lambda',
  description:
    'A comprehensive guide to deploying modern full-stack applications using AWS services - S3 for static hosting, CloudFront for CDN, and Lambda for serverless backend.',
  openGraph: {
    title: 'Deploy Your Full-Stack Application with S3, CloudFront and Lambda',
    description:
      'A comprehensive guide to deploying modern full-stack applications using AWS services - S3 for static hosting, CloudFront for CDN, and Lambda for serverless backend.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deploy Your Full-Stack Application with S3, CloudFront and Lambda',
    description:
      'A comprehensive guide to deploying modern full-stack applications using AWS services - S3 for static hosting, CloudFront for CDN, and Lambda for serverless backend.',
  },
};

export default function BlogPage() {
  return (
    <section>
      <BlogHeader
        title='Deploy Your Full-Stack Application with S3, CloudFront and Lambda'
        date='04-12-2025'
      />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Content</h2>
          <ul>
            <li>Introduction</li>
            <li>Architecture Overview</li>
            <li>Prerequisites</li>
            <li>Part 1: Setting Up S3 for Static Frontend Hosting</li>
            <li>Part 2: Configuring CloudFront for CDN</li>
            <li>Part 3: Deploying Lambda Functions for Backend</li>
            <li>Part 4: Connecting Frontend to Lambda API</li>
            <li>Setting Up Custom Domain with Route 53</li>
            <li>Best Practices and Optimization</li>
            <li>Cost Considerations</li>
            <li>Troubleshooting Common Issues</li>
            <li>Conclusion</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Introduction
          </h2>
          <p>
            Deploying a full-stack application can be complex, but AWS provides
            a powerful set of services that work together seamlessly. By using
            S3 for static hosting, CloudFront as a CDN, and Lambda for
            serverless backend logic, you can create a scalable, cost-effective,
            and high-performance application architecture.
          </p>
          <p>
            This approach is particularly well-suited for modern JavaScript
            frameworks like React, Vue, Angular, or Next.js (static export), and
            can handle backend logic without managing servers.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Architecture Overview
          </h2>
          <p>Here's how the services work together:</p>
          <ul>
            <li>
              <strong>Amazon S3:</strong> Stores your static frontend files
              (HTML, CSS, JS, images) and serves them as a static website
            </li>
            <li>
              <strong>Amazon CloudFront:</strong> Acts as a global CDN,
              caching your content at edge locations worldwide for faster
              delivery and HTTPS support
            </li>
            <li>
              <strong>AWS Lambda:</strong> Runs your backend code in a
              serverless environment, handling API requests, database
              operations, and business logic
            </li>
            <li>
              <strong>API Gateway:</strong> Provides RESTful API endpoints that
              trigger your Lambda functions
            </li>
            <li>
              <strong>Route 53 (optional):</strong> Manages your custom domain
              and routes traffic to CloudFront
            </li>
          </ul>
          <p>
            <strong>The flow:</strong> User → CloudFront (CDN) → S3 (Frontend)
            → API Gateway → Lambda (Backend) → Database/External Services
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Prerequisites
          </h2>
          <ul>
            <li>AWS account with appropriate permissions</li>
            <li>AWS CLI installed and configured</li>
            <li>Node.js and npm installed</li>
            <li>A built frontend application (React, Vue, etc.)</li>
            <li>Basic understanding of AWS services</li>
            <li>Optional: A custom domain name</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Part 1: Setting Up S3 for Static Frontend Hosting
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 1: Create an S3 Bucket
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Create S3 bucket
aws s3 mb s3://your-app-frontend --region us-east-1

# Or using AWS Console:
# 1. Go to S3 Console
# 2. Click "Create bucket"
# 3. Enter bucket name (must be globally unique)
# 4. Choose region
# 5. Uncheck "Block all public access" (we'll use CloudFront)
# 6. Click "Create bucket"`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 2: Configure Bucket for Static Website Hosting
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Enable static website hosting
aws s3 website s3://your-app-frontend \\
  --index-document index.html \\
  --error-document index.html

# Or in AWS Console:
# 1. Select your bucket
# 2. Go to "Properties" tab
# 3. Scroll to "Static website hosting"
# 4. Click "Edit"
# 5. Enable static website hosting
# 6. Set index document: index.html
# 7. Set error document: index.html (for SPA routing)
# 8. Save changes`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 3: Set Bucket Policy
          </h3>
          <p>
            Create a bucket policy to allow CloudFront to access your content:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-app-frontend/*"
    }
  ]
}

# Apply the policy
aws s3api put-bucket-policy \\
  --bucket your-app-frontend \\
  --policy file://bucket-policy.json`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 4: Build and Upload Your Frontend
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Build your frontend (example for React)
npm run build

# Upload to S3
aws s3 sync ./build s3://your-app-frontend --delete

# For Next.js static export
npm run build
aws s3 sync ./out s3://your-app-frontend --delete

# Set cache control headers
aws s3 sync ./build s3://your-app-frontend \\
  --delete \\
  --cache-control "max-age=31536000,public" \\
  --exclude "index.html" \\
  --exclude "*.json"

# Don't cache index.html (always serve fresh)
aws s3 cp ./build/index.html s3://your-app-frontend/index.html \\
  --cache-control "max-age=0,no-cache,no-store,must-revalidate"`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Part 2: Configuring CloudFront for CDN
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 1: Create CloudFront Distribution
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Using AWS Console (recommended for first time):
# 1. Go to CloudFront Console
# 2. Click "Create Distribution"
# 3. Origin Settings:
#    - Origin Domain: Select your S3 bucket
#    - Origin Path: leave empty
#    - Name: auto-filled
#    - Origin Access: "Origin access control settings (recommended)"
#    - Create new OAC
# 4. Default Cache Behavior:
#    - Viewer Protocol Policy: "Redirect HTTP to HTTPS"
#    - Allowed HTTP Methods: GET, HEAD, OPTIONS
#    - Cache Policy: "CachingOptimized"
# 5. Settings:
#    - Price Class: Choose based on your needs
#    - Alternate Domain Names (CNAMEs): your-domain.com
#    - Custom SSL Certificate: Request or select certificate
#    - Default Root Object: index.html
# 6. Click "Create Distribution"

# Wait for deployment (15-20 minutes)
# Note the CloudFront domain name (e.g., d123abc.cloudfront.net)`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 2: Configure Error Pages for SPA Routing
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# In CloudFront Console:
# 1. Select your distribution
# 2. Go to "Error Pages" tab
# 3. Click "Create Custom Error Response"
# 4. Configure:
#    - HTTP Error Code: 403 (Forbidden)
#    - Customize Error Response: Yes
#    - Response Page Path: /index.html
#    - HTTP Response Code: 200 (OK)
# 5. Repeat for 404 error code
# This ensures client-side routing works correctly`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 3: Request SSL Certificate (Optional but Recommended)
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Using AWS Certificate Manager (ACM)
# IMPORTANT: Must be in us-east-1 region for CloudFront

# 1. Go to AWS Certificate Manager in us-east-1
# 2. Click "Request a certificate"
# 3. Choose "Request a public certificate"
# 4. Add domain names:
#    - yourdomain.com
#    - www.yourdomain.com
# 5. Validation method: DNS validation (recommended)
# 6. Add CNAME records to your DNS provider
# 7. Wait for validation (5-30 minutes)
# 8. Attach certificate to CloudFront distribution`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Part 3: Deploying Lambda Functions for Backend
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 1: Create a Lambda Function
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`// Example Lambda function (index.js)
exports.handler = async (event) => {
  // Log the incoming event
  console.log('Event:', JSON.stringify(event, null, 2));

  // Parse request body if present
  let body = {};
  if (event.body) {
    body = JSON.parse(event.body);
  }

  // Handle different HTTP methods
  const method = event.httpMethod || event.requestContext?.http?.method;

  try {
    let response;

    switch (method) {
      case 'GET':
        response = await handleGet(event);
        break;
      case 'POST':
        response = await handlePost(body);
        break;
      case 'PUT':
        response = await handlePut(event.pathParameters?.id, body);
        break;
      case 'DELETE':
        response = await handleDelete(event.pathParameters?.id);
        break;
      default:
        return {
          statusCode: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          },
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Internal server error', message: error.message }),
    };
  }
};

async function handleGet(event) {
  // Your GET logic here
  return { message: 'GET request successful', data: [] };
}

async function handlePost(body) {
  // Your POST logic here
  return { message: 'POST request successful', data: body };
}

async function handlePut(id, body) {
  // Your PUT logic here
  return { message: \`PUT request successful for ID: \${id}\`, data: body };
}

async function handleDelete(id) {
  // Your DELETE logic here
  return { message: \`DELETE request successful for ID: \${id}\` };
}`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 2: Deploy Lambda Function
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Create deployment package
zip -r function.zip index.js node_modules/

# Create Lambda function
aws lambda create-function \\
  --function-name my-api-function \\
  --runtime nodejs20.x \\
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip \\
  --timeout 30 \\
  --memory-size 256

# Update existing function
aws lambda update-function-code \\
  --function-name my-api-function \\
  --zip-file fileb://function.zip

# Or using AWS Console:
# 1. Go to Lambda Console
# 2. Click "Create function"
# 3. Choose "Author from scratch"
# 4. Function name: my-api-function
# 5. Runtime: Node.js 20.x
# 6. Create function
# 7. Upload your code via zip or inline editor
# 8. Configure environment variables, timeout, memory`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Step 3: Set Up API Gateway
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Using AWS Console for API Gateway:
# 1. Go to API Gateway Console
# 2. Choose "HTTP API" (simpler and cheaper) or "REST API"
# 3. Click "Build"
# 4. Add integration:
#    - Integration type: Lambda
#    - Lambda function: my-api-function
#    - API name: my-fullstack-api
# 5. Configure routes:
#    - Method: ANY
#    - Resource path: /{proxy+}
#    - Integration: my-api-function
# 6. Configure CORS:
#    - Access-Control-Allow-Origin: *
#    - Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
#    - Access-Control-Allow-Headers: Content-Type,Authorization
# 7. Create and deploy
# 8. Note your API endpoint: https://xyz123.execute-api.us-east-1.amazonaws.com

# Using AWS CLI for HTTP API:
aws apigatewayv2 create-api \\
  --name my-fullstack-api \\
  --protocol-type HTTP \\
  --target arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:my-api-function

# Add Lambda permission for API Gateway
aws lambda add-permission \\
  --function-name my-api-function \\
  --statement-id apigateway-invoke \\
  --action lambda:InvokeFunction \\
  --principal apigateway.amazonaws.com`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Part 4: Connecting Frontend to Lambda API
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Environment Variables for Frontend
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`// .env.production
REACT_APP_API_URL=https://xyz123.execute-api.us-east-1.amazonaws.com

// For Next.js
NEXT_PUBLIC_API_URL=https://xyz123.execute-api.us-east-1.amazonaws.com

// For Vite
VITE_API_URL=https://xyz123.execute-api.us-east-1.amazonaws.com`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            API Service Implementation
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`// api.js
const API_URL = process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(\`\${API_URL}\${endpoint}\`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(\`\${API_URL}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  },

  async put(endpoint, data) {
    const response = await fetch(\`\${API_URL}\${endpoint}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  },

  async delete(endpoint) {
    const response = await fetch(\`\${API_URL}\${endpoint}\`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  },
};

// Usage example
export const getUsers = () => apiClient.get('/users');
export const createUser = (userData) => apiClient.post('/users', userData);
export const updateUser = (id, userData) => apiClient.put(\`/users/\${id}\`, userData);
export const deleteUser = (id) => apiClient.delete(\`/users/\${id}\`);`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Setting Up Custom Domain with Route 53
          </h2>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# If your domain is in Route 53:
# 1. Go to Route 53 Console
# 2. Select your hosted zone
# 3. Click "Create Record"
# 4. Record configuration:
#    - Record name: leave empty (for root) or "www"
#    - Record type: A
#    - Alias: Yes
#    - Route traffic to: Alias to CloudFront distribution
#    - Select your CloudFront distribution
#    - Routing policy: Simple routing
# 5. Create record
# 6. Repeat for www subdomain if needed

# For API Gateway custom domain:
# 1. Go to API Gateway Console
# 2. Select "Custom domain names"
# 3. Click "Create"
# 4. Domain name: api.yourdomain.com
# 5. Certificate: Select ACM certificate
# 6. Create domain
# 7. Add API mapping to your API
# 8. Create Route 53 A record pointing to API Gateway domain`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Best Practices and Optimization
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            1. CloudFront Caching Strategy
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Cache-Control headers for different file types:

# Static assets (JS, CSS, images) - long cache
Cache-Control: public, max-age=31536000, immutable

# HTML files - no cache
Cache-Control: no-cache, no-store, must-revalidate

# API responses - conditional
Cache-Control: public, max-age=300, s-maxage=600

# Use CloudFront cache behaviors for different paths
# /static/* - Cache everything
# /api/* - Don't cache or short TTL
# /* - Cache HTML with custom TTL`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            2. Lambda Optimization
          </h3>
          <ul>
            <li>
              <strong>Cold starts:</strong> Keep functions warm with scheduled
              CloudWatch Events or use Provisioned Concurrency
            </li>
            <li>
              <strong>Memory allocation:</strong> Test different memory settings
              (more memory = faster CPU, but costs more)
            </li>
            <li>
              <strong>Connection reuse:</strong> Initialize database connections
              outside the handler for reuse across invocations
            </li>
            <li>
              <strong>Bundle size:</strong> Keep deployment packages small by
              excluding dev dependencies
            </li>
            <li>
              <strong>Environment variables:</strong> Use for configuration
              instead of hardcoding
            </li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            3. Security Best Practices
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# 1. Use CloudFront Origin Access Control (OAC)
#    - Prevents direct S3 access, forces through CloudFront

# 2. Enable AWS WAF on CloudFront
#    - Protect against common web exploits
#    - Rate limiting, geo-blocking

# 3. Lambda function security
#    - Use IAM roles with least privilege
#    - Enable encryption at rest
#    - Store secrets in AWS Secrets Manager

# 4. API Gateway security
#    - Enable throttling
#    - Use API keys for authentication
#    - Implement CORS properly

# 5. Enable CloudFront access logs
#    - Monitor and analyze traffic patterns`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            4. Deployment Automation
          </h3>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`#!/bin/bash
# deploy.sh - Automated deployment script

set -e

echo "Building frontend..."
npm run build

echo "Uploading to S3..."
aws s3 sync ./build s3://your-app-frontend \\
  --delete \\
  --cache-control "max-age=31536000,public" \\
  --exclude "index.html" \\
  --exclude "*.json"

aws s3 cp ./build/index.html s3://your-app-frontend/index.html \\
  --cache-control "max-age=0,no-cache,no-store,must-revalidate"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \\
  --distribution-id YOUR_DISTRIBUTION_ID \\
  --paths "/*"

echo "Deploying Lambda functions..."
cd lambda
zip -r function.zip .
aws lambda update-function-code \\
  --function-name my-api-function \\
  --zip-file fileb://function.zip
cd ..

echo "Deployment complete!"

# Add to package.json scripts:
# "deploy": "./deploy.sh"
# "deploy:frontend": "npm run build && aws s3 sync ./build s3://your-app-frontend"
# "deploy:backend": "cd lambda && zip -r function.zip . && aws lambda update-function-code --function-name my-api-function --zip-file fileb://function.zip"`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Cost Considerations
          </h2>
          <p>Understanding the cost structure helps optimize your spending:</p>
          <ul>
            <li>
              <strong>S3:</strong> $0.023 per GB/month for storage, $0.09 per GB
              for data transfer out (first 10 TB)
            </li>
            <li>
              <strong>CloudFront:</strong> $0.085 per GB for first 10 TB/month,
              cheaper at edge locations closer to users
            </li>
            <li>
              <strong>Lambda:</strong> First 1 million requests free, then
              $0.20 per million. $0.0000166667 per GB-second for compute
            </li>
            <li>
              <strong>API Gateway:</strong> HTTP API: $1.00 per million
              requests, REST API: $3.50 per million requests
            </li>
          </ul>
          <p>
            <strong>Cost optimization tips:</strong>
          </p>
          <ul>
            <li>Use CloudFront caching aggressively to reduce S3 requests</li>
            <li>Choose HTTP API over REST API when possible (3.5x cheaper)</li>
            <li>Optimize Lambda memory allocation for best price/performance</li>
            <li>Enable S3 Intelligent-Tiering for infrequently accessed files</li>
            <li>Set up CloudWatch billing alerts to monitor spending</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Troubleshooting Common Issues
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            1. SPA Routes Return 403/404
          </h3>
          <p>
            <strong>Problem:</strong> Refreshing on any route except root returns
            an error.
          </p>
          <p>
            <strong>Solution:</strong> Configure CloudFront error pages to
            redirect 403/404 to index.html with 200 status code.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            2. CORS Errors
          </h3>
          <p>
            <strong>Problem:</strong> Frontend can't call API due to CORS policy.
          </p>
          <p>
            <strong>Solution:</strong> Ensure Lambda returns proper CORS headers
            and API Gateway has CORS enabled. Handle OPTIONS requests.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            3. Lambda Cold Starts
          </h3>
          <p>
            <strong>Problem:</strong> First request is slow after inactivity.
          </p>
          <p>
            <strong>Solution:</strong> Use Provisioned Concurrency, keep
            functions warm with CloudWatch Events, or optimize package size.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            4. CloudFront Shows Old Content
          </h3>
          <p>
            <strong>Problem:</strong> Updates not visible immediately.
          </p>
          <p>
            <strong>Solution:</strong> Create CloudFront invalidation after
            deployment: <code>aws cloudfront create-invalidation --distribution-id ID --paths "/*"</code>
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            5. Lambda Timeout Errors
          </h3>
          <p>
            <strong>Problem:</strong> Function times out after 3 seconds (default).
          </p>
          <p>
            <strong>Solution:</strong> Increase timeout in Lambda configuration
            (max 15 minutes), optimize code, or use async processing.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Conclusion
          </h2>
          <p>
            Deploying a full-stack application using S3, CloudFront, and Lambda
            provides a scalable, cost-effective, and performant solution. This
            serverless architecture eliminates the need for server management
            while providing:
          </p>
          <ul>
            <li>Global content delivery through CloudFront's edge network</li>
            <li>Automatic scaling based on demand</li>
            <li>Pay-per-use pricing model</li>
            <li>High availability and fault tolerance</li>
            <li>Easy integration with other AWS services</li>
          </ul>
          <p>
            While there's an initial learning curve, the benefits of this
            architecture make it an excellent choice for modern web applications.
            Start with a simple setup and gradually add features like custom
            domains, database integrations, authentication, and monitoring as
            your application grows.
          </p>
          <p>
            Remember to implement proper security practices, monitor costs, and
            optimize based on your specific use case. Happy deploying!
          </p>
        </div>
      </div>
    </section>
  );
}
