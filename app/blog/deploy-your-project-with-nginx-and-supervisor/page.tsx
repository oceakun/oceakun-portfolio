import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';
import CodeBlock from '../../../components/codeBlock';

export const metadata: Metadata = {
  title: 'Deploying React SSR App and Node.js API with nginx and Supervisor',
  description:
    'A comprehensive guide to deploying React applications with server-side rendering and Node.js API backend using nginx as a reverse proxy and supervisor for process management.',
  openGraph: {
    title: 'Deploying React SSR App and Node.js API with nginx and Supervisor',
    description:
      'A comprehensive guide to deploying React applications with server-side rendering and Node.js API backend using nginx as a reverse proxy and supervisor for process management.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deploying React SSR App and Node.js API with nginx and Supervisor',
    description:
      'A comprehensive guide to deploying React applications with server-side rendering and Node.js API backend using nginx as a reverse proxy and supervisor for process management.',
  },
};

export default function BlogPage() {
  return (
    <section>
      <BlogHeader
        title='Deploying React SSR App and Node.js API with nginx and Supervisor'
        date='11-18-2025'
      />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Overview</h2>
          <p>
            This guide covers deploying a React application with server-side
            rendering (SSR) and a Node.js API backend using nginx as a reverse
            proxy and supervisor for process management.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Prerequisites
          </h2>
          <ul>
            <li>Ubuntu/Debian server with sudo access</li>
            <li>Node.js 18+ installed</li>
            <li>
              Domain names configured (e.g., <code>myapp.com</code> for React,{' '}
              <code>api.myapp.com</code> for backend)
            </li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Initial Server Setup
          </h2>
          <CodeBlock>
            {`# Update system
sudo apt update && sudo apt upgrade -y

# Install nginx and supervisor
sudo apt install nginx supervisor

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs

# Install SSL certificate tool
sudo apt install certbot python3-certbot-nginx`}
          </CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Deploy Node.js API Backend
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            1. Setup API Application
          </h3>
          <CodeBlock>
            {`# Clone your API repository
cd /var/www
sudo git clone your-api-repo.git api
cd api

# Install dependencies
sudo npm ci --production

# Create environment file
sudo nano .env
# Add: NODE_ENV=production, PORT=3000, etc.`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            2. Configure Supervisor for API
          </h3>
          <CodeBlock>sudo nano /etc/supervisor/conf.d/api.conf</CodeBlock>
          <CodeBlock>
            {`[program:api]
command=/usr/bin/node server.js
directory=/var/www/api
user=www-data
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/api.log
stderr_logfile=/var/log/api-error.log
environment=NODE_ENV="production"`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            3. Configure nginx for API
          </h3>
          <CodeBlock>sudo nano /etc/nginx/sites-available/api</CodeBlock>
          <CodeBlock>
            {`server {
    listen 80;
    server_name api.myapp.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            4. Start API Services
          </h3>
          <CodeBlock>
            {`# Enable nginx site
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/

# Start supervisor and API
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start api

# Start nginx
sudo systemctl start nginx
sudo systemctl enable nginx`}
          </CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Deploy React SSR Application
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            1. Setup React Application
          </h3>
          <CodeBlock>
            {`# Clone React app repository
cd /var/www
sudo git clone your-react-repo.git frontend
cd frontend

# Install dependencies
sudo npm ci

# Build application for SSR
sudo npm run build`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            2. Configure Supervisor for SSR
          </h3>
          <CodeBlock>sudo nano /etc/supervisor/conf.d/frontend.conf</CodeBlock>
          <CodeBlock>
            {`[program:frontend]
command=/usr/bin/npm run ssr
directory=/var/www/frontend
user=www-data
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/frontend.log
stderr_logfile=/var/log/frontend-error.log
environment=NODE_ENV="production"`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            3. Configure nginx for React SSR
          </h3>
          <CodeBlock>sudo nano /etc/nginx/sites-available/frontend</CodeBlock>
          <CodeBlock>
            {`server {
    listen 80;
    server_name myapp.com www.myapp.com;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            4. Start Frontend Services
          </h3>
          <CodeBlock>
            {`# Enable nginx site
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/

# Update supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start frontend

# Reload nginx
sudo nginx -t
sudo systemctl reload nginx`}
          </CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            SSL Configuration
          </h2>
          <CodeBlock>
            {`# Get SSL certificates for both domains
sudo certbot --nginx -d myapp.com -d www.myapp.com
sudo certbot --nginx -d api.myapp.com

# Verify auto-renewal
sudo certbot renew --dry-run`}
          </CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Deployment Workflow
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            Updating API
          </h3>
          <CodeBlock>
            {`cd /var/www/api
sudo git pull origin main
sudo npm ci --production
sudo supervisorctl restart api`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            Updating React SSR App
          </h3>
          <CodeBlock>
            {`cd /var/www/frontend
sudo git pull origin main
sudo npm ci
sudo npm run build
sudo supervisorctl restart frontend`}
          </CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Monitoring and Troubleshooting
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            Check Service Status
          </h3>
          <CodeBlock>
            {`# Check supervisor processes
sudo supervisorctl status

# Monitor logs
sudo supervisorctl tail -f api
sudo supervisorctl tail -f frontend

# Check nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log`}
          </CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif'>
            Common Issues
          </h3>
          <p>
            <strong>Port conflicts:</strong> Check what&apos;s using ports with{' '}
            <code>sudo lsof -i :PORT</code> and kill conflicting processes.
          </p>
          <p>
            <strong>SSR startup failures:</strong> Verify the React app has
            proper SSR scripts in package.json and server directory exists.
          </p>
          <p>
            <strong>nginx connection errors:</strong> Ensure supervisor
            processes are running and listening on correct ports.
          </p>
          <p>
            <strong>SSL issues:</strong> Verify certificates with{' '}
            <code>sudo certbot certificates</code> and renew if needed.
          </p>

          <p className='mt-8'>
            This setup provides a production-ready environment for React SSR
            applications with Node.js APIs, ensuring proper process management
            and reliable service delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
