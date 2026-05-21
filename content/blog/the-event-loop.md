---
title: 'The Event Loop'
description: "A look under the hood of JavaScript's concurrency model - the call stack, Web/Node.js APIs, the task and microtask queues, and how they orchestrate asynchronous execution."
date: '06-05-2026'
slug: 'the-event-loop'
stack: 'JavaScript, Node.js, Browser'
tags:
  - 'JavaScript'
  - 'Event Loop'
  - 'Async'
  - 'Frontend'
readyForRelease: false
banner:
  title: 'The Event Loop'
  subtitle: 'How JavaScript runs asynchronous code on a single thread'
overview:
  - 'Introduction'
  - name: 'Fundamentals'
    subtopics:
      - 'Single-threaded JavaScript'
      - 'Synchronous vs. Asynchronous'
      - 'Concurrency without Parallelism'
  - name: 'The Components'
    subtopics:
      - 'The Call Stack'
      - 'Web / Node.js APIs'
      - 'Macrotask Queue'
      - 'Microtask Queue'
  - 'How the Event Loop Orchestrates Execution'
  - name: 'In Practice'
    subtopics:
      - 'setTimeout vs. Promise.then'
      - 'Starving the Event Loop'
      - 'Browser vs. Node.js Differences'
  - 'Common Pitfalls'
references:
  - name: 'HTML Standard - Event loops'
    url: 'https://html.spec.whatwg.org/multipage/webappapis.html#event-loops'
  - name: 'MDN - The event loop'
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop'
  - name: 'Node.js - The Node.js Event Loop'
    url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick'
  - name: 'What the heck is the event loop anyway? - Philip Roberts (JSConf EU)'
    url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ'
---
