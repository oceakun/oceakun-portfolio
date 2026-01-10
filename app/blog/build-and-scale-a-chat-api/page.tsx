import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';
import CodeBlock from '../../../components/codeBlock';

export const metadata: Metadata = {
  title: 'Build and scale a chat API',
  description:
    'Learn how to architect, build, and scale a production-ready chat API. From WebSocket connections to message delivery, presence systems, and horizontal scaling strategies.',
  openGraph: {
    title: 'Build and scale a chat API',
    description:
      'Learn how to architect, build, and scale a production-ready chat API. From WebSocket connections to message delivery, presence systems, and horizontal scaling strategies.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build and scale a chat API',
    description:
      'Learn how to architect, build, and scale a production-ready chat API. From WebSocket connections to message delivery, presence systems, and horizontal scaling strategies.',
  },
};

export default function BlogPage() {
  return (
    <section>
      <BlogHeader title='Build and scale a chat API' date='08-01-2026' />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Content</h2>
          <ul>
            <li>Introduction: Chat API Fundamentals</li>
            <li>Architecture Overview</li>
            <li>WebSocket vs Long Polling vs Server-Sent Events</li>
            <li>Building the Core: Connection Management</li>
            <li>Message Delivery Guarantees</li>
            <li>Presence and Online Status</li>
            <li>Read Receipts and Typing Indicators</li>
            <li>Database Schema and Message Storage</li>
            <li>Scaling Horizontally with Redis Pub/Sub</li>
            <li>Rate Limiting and Security</li>
            <li>Monitoring and Observability</li>
            <li>Production Deployment Considerations</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Introduction: Chat API Fundamentals
          </h2>
          <p>
            Building a chat API is deceptively complex. What seems
            simple—sending messages between users—quickly becomes a distributed
            systems challenge when you need real-time delivery, reliable message
            ordering, presence tracking, and the ability to scale to millions of
            concurrent connections.
          </p>
          <p>
            In this guide, we'll build a production-ready chat API from scratch,
            tackling the hard problems: connection management, message delivery
            guarantees, and horizontal scaling.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Architecture Overview
          </h2>
          <p>
            A scalable chat system requires several components working together:
          </p>
          <ul>
            <li>
              <strong>WebSocket Server:</strong> Handles persistent client
              connections
            </li>
            <li>
              <strong>Message Queue:</strong> Ensures reliable message delivery
            </li>
            <li>
              <strong>Redis Pub/Sub:</strong> Coordinates messages across server
              instances
            </li>
            <li>
              <strong>Database:</strong> Persists messages, users, and chat
              metadata
            </li>
            <li>
              <strong>API Gateway:</strong> Routes REST API requests
            </li>
            <li>
              <strong>Presence Service:</strong> Tracks online/offline status
            </li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            WebSocket vs Long Polling vs Server-Sent Events
          </h2>
          <p>
            Let's compare the three main approaches for real-time communication:
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            WebSockets
          </h3>
          <p>
            <strong>Pros:</strong> Full-duplex, low latency, efficient
            (persistent connection)
          </p>
          <p>
            <strong>Cons:</strong> Complex to scale, requires sticky sessions or
            Redis Pub/Sub
          </p>
          <CodeBlock>{`// WebSocket connection
const ws = new WebSocket('wss://api.example.com/chat');

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  displayMessage(message);
};

ws.send(JSON.stringify({
  type: 'message',
  content: 'Hello!',
  channelId: '123'
}));`}</CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Long Polling
          </h3>
          <p>
            <strong>Pros:</strong> Works everywhere, simple to implement
          </p>
          <p>
            <strong>Cons:</strong> Higher latency, more HTTP overhead
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Server-Sent Events (SSE)
          </h3>
          <p>
            <strong>Pros:</strong> Simple, automatic reconnection, works over
            HTTP
          </p>
          <p>
            <strong>Cons:</strong> Unidirectional (server → client only)
          </p>
          <p>
            <strong>Verdict:</strong> WebSockets for chat. The bidirectional
            nature and low latency make it the best choice despite scaling
            complexity.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Building the Core: Connection Management
          </h2>
          <p>
            The foundation of a chat API is managing WebSocket connections
            reliably.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Connection Lifecycle
          </h3>
          <CodeBlock>{`// Node.js WebSocket server with ws library
import WebSocket, { WebSocketServer } from 'ws';
import { verifyToken } from './auth';

const wss = new WebSocketServer({ port: 8080 });

// Store active connections
const connections = new Map<string, WebSocket>();

wss.on('connection', async (ws, req) => {
  // 1. Authenticate
  const token = new URLSearchParams(req.url.split('?')[1]).get('token');
  const userId = await verifyToken(token);

  if (!userId) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  // 2. Store connection
  connections.set(userId, ws);
  console.log(\`User \${userId} connected. Total: \${connections.size}\`);

  // 3. Send pending messages
  await sendPendingMessages(userId, ws);

  // 4. Broadcast presence
  broadcastPresence(userId, 'online');

  // 5. Handle incoming messages
  ws.on('message', (data) => {
    handleMessage(userId, data);
  });

  // 6. Handle disconnection
  ws.on('close', () => {
    connections.delete(userId);
    broadcastPresence(userId, 'offline');
    console.log(\`User \${userId} disconnected. Total: \${connections.size}\`);
  });

  // 7. Handle errors
  ws.on('error', (error) => {
    console.error(\`WebSocket error for user \${userId}:\`, error);
  });
});`}</CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Heartbeat and Reconnection
          </h3>
          <p>Detect stale connections and handle reconnections gracefully:</p>
          <CodeBlock>{`// Server-side heartbeat
function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});

// Ping all connections every 30 seconds
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});`}</CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Message Delivery Guarantees
          </h2>
          <p>
            Chat requires reliable message delivery. You need to handle three
            scenarios:
          </p>
          <ol>
            <li>
              <strong>At-most-once:</strong> Message may be lost (unacceptable)
            </li>
            <li>
              <strong>At-least-once:</strong> Message delivered, may duplicate
              (acceptable)
            </li>
            <li>
              <strong>Exactly-once:</strong> Message delivered once (ideal but
              complex)
            </li>
          </ol>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Implementing At-Least-Once Delivery
          </h3>
          <CodeBlock>{`async function sendMessage(senderId, channelId, content) {
  // 1. Generate unique message ID
  const messageId = generateUUID();

  // 2. Save to database first (durability)
  await db.messages.insert({
    id: messageId,
    senderId,
    channelId,
    content,
    timestamp: Date.now(),
    delivered: false
  });

  // 3. Get all recipients in channel
  const recipients = await db.channels.getMembers(channelId);

  // 4. Attempt delivery to online users
  const deliveryPromises = recipients.map(async (recipientId) => {
    const ws = connections.get(recipientId);

    if (ws && ws.readyState === WebSocket.OPEN) {
      return new Promise((resolve) => {
        ws.send(JSON.stringify({
          type: 'message',
          messageId,
          senderId,
          channelId,
          content,
          timestamp: Date.now()
        }), (error) => {
          if (error) {
            console.error(\`Failed to send to \${recipientId}\`, error);
          }
          resolve();
        });
      });
    }
  });

  await Promise.all(deliveryPromises);

  // 5. Mark as delivered
  await db.messages.update(messageId, { delivered: true });

  return messageId;
}`}</CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Handling Offline Users
          </h3>
          <CodeBlock>{`// When user reconnects, send pending messages
async function sendPendingMessages(userId, ws) {
  const lastSeenTimestamp = await db.users.getLastSeen(userId);

  const pendingMessages = await db.messages.findAll({
    where: {
      channelId: {
        in: await db.users.getChannelIds(userId)
      },
      timestamp: { gt: lastSeenTimestamp },
      senderId: { ne: userId } // Don't send own messages
    },
    orderBy: { timestamp: 'asc' }
  });

  for (const msg of pendingMessages) {
    ws.send(JSON.stringify({
      type: 'message',
      ...msg
    }));
  }

  // Update last seen
  await db.users.updateLastSeen(userId, Date.now());
}`}</CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Database Schema and Message Storage
          </h2>
          <p>Efficient schema design is critical for chat performance:</p>
          <CodeBlock>{`-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  last_seen TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Channels (rooms/conversations)
CREATE TABLE channels (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(20) CHECK (type IN ('direct', 'group', 'public')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Channel members
CREATE TABLE channel_members (
  channel_id UUID REFERENCES channels(id),
  user_id UUID REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  last_read_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (channel_id, user_id)
);

-- Messages (partitioned by month for scalability)
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  channel_id UUID REFERENCES channels(id),
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  edited_at TIMESTAMP,
  deleted_at TIMESTAMP
) PARTITION BY RANGE (created_at);

-- Indexes for common queries
CREATE INDEX idx_messages_channel_time ON messages(channel_id, created_at DESC);
CREATE INDEX idx_channel_members_user ON channel_members(user_id);`}</CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Scaling Horizontally with Redis Pub/Sub
          </h2>
          <p>
            When you add multiple WebSocket servers, clients might connect to
            different instances. Redis Pub/Sub coordinates messages across
            servers:
          </p>
          <CodeBlock>{`import Redis from 'ioredis';

const publisher = new Redis();
const subscriber = new Redis();

// Subscribe to messages for this server
subscriber.subscribe('chat:messages');

subscriber.on('message', (channel, message) => {
  const { channelId, messageData } = JSON.parse(message);

  // Find local connections in this channel
  const localRecipients = getLocalConnectionsForChannel(channelId);

  localRecipients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(messageData));
    }
  });
});

// When user sends message, publish to all servers
async function broadcastMessage(channelId, messageData) {
  // 1. Save to database
  await db.messages.insert(messageData);

  // 2. Publish to Redis (reaches all servers)
  await publisher.publish('chat:messages', JSON.stringify({
    channelId,
    messageData
  }));
}`}</CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Presence System with Redis
          </h3>
          <CodeBlock>{`// Track online users across servers
async function setUserOnline(userId) {
  await redis.sadd('online_users', userId);
  await redis.expire(\`user:\${userId}:heartbeat\`, 60); // 60 second TTL

  // Broadcast presence change
  await publisher.publish('presence', JSON.stringify({
    userId,
    status: 'online'
  }));
}

// Heartbeat to keep user marked as online
setInterval(async () => {
  for (const [userId, ws] of connections) {
    await redis.expire(\`user:\${userId}:heartbeat\`, 60);
  }
}, 30000);

// Detect stale users
setInterval(async () => {
  const onlineUsers = await redis.smembers('online_users');

  for (const userId of onlineUsers) {
    const ttl = await redis.ttl(\`user:\${userId}:heartbeat\`);

    if (ttl === -2) {
      // User went offline
      await redis.srem('online_users', userId);
      await publisher.publish('presence', JSON.stringify({
        userId,
        status: 'offline'
      }));
    }
  }
}, 10000);`}</CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Rate Limiting and Security
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Per-User Rate Limiting
          </h3>
          <CodeBlock>{`import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'rate_limit',
  points: 10, // Number of messages
  duration: 1, // Per second
});

async function handleMessage(userId, data) {
  try {
    await rateLimiter.consume(userId);

    // Process message
    await sendMessage(userId, data.channelId, data.content);
  } catch (error) {
    if (error instanceof Error) {
      // Rate limit exceeded
      const ws = connections.get(userId);
      ws?.send(JSON.stringify({
        type: 'error',
        message: 'Rate limit exceeded. Please slow down.'
      }));
    }
  }
}`}</CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Input Validation and Sanitization
          </h3>
          <CodeBlock>{`import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const messageSchema = z.object({
  type: z.literal('message'),
  channelId: z.string().uuid(),
  content: z.string().min(1).max(4000)
});

function validateAndSanitize(data) {
  // Validate structure
  const parsed = messageSchema.parse(data);

  // Sanitize HTML
  parsed.content = sanitizeHtml(parsed.content, {
    allowedTags: ['b', 'i', 'em', 'strong', 'code'],
    allowedAttributes: {}
  });

  return parsed;
}`}</CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Monitoring and Observability
          </h2>
          <p>Track key metrics for a healthy chat system:</p>
          <ul>
            <li>
              <strong>Active connections:</strong> Current WebSocket connections
            </li>
            <li>
              <strong>Message throughput:</strong> Messages per second
            </li>
            <li>
              <strong>Message latency:</strong> Time from send to delivery
            </li>
            <li>
              <strong>Error rate:</strong> Failed deliveries, connection errors
            </li>
            <li>
              <strong>Redis Pub/Sub lag:</strong> Message propagation delay
            </li>
          </ul>
          <CodeBlock>{`import prometheus from 'prom-client';

const activeConnections = new prometheus.Gauge({
  name: 'chat_active_connections',
  help: 'Number of active WebSocket connections'
});

const messagesTotal = new prometheus.Counter({
  name: 'chat_messages_total',
  help: 'Total messages sent',
  labelNames: ['status'] // 'success', 'failed'
});

const messageLatency = new prometheus.Histogram({
  name: 'chat_message_latency_seconds',
  help: 'Message delivery latency',
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2]
});

// Update metrics
wss.on('connection', () => {
  activeConnections.inc();
});

ws.on('close', () => {
  activeConnections.dec();
});`}</CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Production Deployment Considerations
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Load Balancing
          </h3>
          <p>Use a load balancer with sticky sessions or consistent hashing:</p>
          <CodeBlock>{`# nginx configuration with IP hash for sticky sessions
upstream websocket_backend {
  ip_hash; # Same client always goes to same server
  server ws1.example.com:8080;
  server ws2.example.com:8080;
  server ws3.example.com:8080;
}

server {
  location /chat {
    proxy_pass http://websocket_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400; # 24 hours
  }
}`}</CodeBlock>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Graceful Shutdown
          </h3>
          <CodeBlock>{`process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Starting graceful shutdown...');

  // 1. Stop accepting new connections
  wss.close();

  // 2. Notify clients to reconnect to another server
  for (const [userId, ws] of connections) {
    ws.send(JSON.stringify({
      type: 'reconnect',
      message: 'Server shutting down. Please reconnect.'
    }));
    ws.close(1012, 'Server restart');
  }

  // 3. Wait for connections to close
  await new Promise(resolve => setTimeout(resolve, 5000));

  // 4. Close database connections
  await db.close();
  await redis.quit();

  process.exit(0);
});`}</CodeBlock>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Conclusion
          </h2>
          <p>
            Building a scalable chat API requires careful attention to
            connection management, message delivery, and distributed systems
            challenges. The patterns we've covered—Redis Pub/Sub for horizontal
            scaling, at-least-once delivery guarantees, and proper
            monitoring—form the foundation of production chat systems.
          </p>
          <p>The key takeaways:</p>
          <ul>
            <li>Use WebSockets for real-time bidirectional communication</li>
            <li>Persist messages before delivery (durability)</li>
            <li>Use Redis Pub/Sub to coordinate across server instances</li>
            <li>Implement heartbeats and reconnection logic</li>
            <li>Rate limit aggressively to prevent abuse</li>
            <li>Monitor everything—connections, latency, errors</li>
          </ul>
          <p>
            With these foundations in place, you can build a chat system that
            scales to millions of users while maintaining reliability and
            performance.
          </p>
        </div>
      </div>
    </section>
  );
}
