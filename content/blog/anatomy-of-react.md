---
title: "Anatomy of React"
description: "Deep dive into React state management - from useState internals to state updates, batching, reconciliation, and the mental model you need to master React state."
date: "10-01-2026"
banner:
  title: "Anatomy of React"
  subtitle: "A Deep Dive into React's architecture"
overview:
  - "Introduction"
  - "State is Neither Ephemeral Nor Permanent"
  - "Rendering vs. Reconciliation"
  - "Virtual DOM"
  - "The Event Loop"
  - "Stack Reconciler - The Old Way"
  - "Fibre - The Upgrade"
references:
  - name: "React useState - Official Docs"
    url: "https://react.dev/reference/react/useState"
  - name: "React Fiber Architecture - GitHub"
    url: "https://github.com/acdlite/react-fiber-architecture"
  - name: "A deep dive into React Fiber - LogRocket"
    url: "https://blog.logrocket.com/deep-dive-react-fiber/"
---

## INTRODUCTION

My earliest exposure to React took place around 2022, when I was building calculators and counter games in Vanilla Javascript. Back then, in order to update a part of the UI, I would first use selectors (`document.querySelector`, `document.getElementById` and `document.getElementsByClassName`) to pick that specific component and then describe the logic for the update. But, with this approach, there was a lot of scope for things to go wrong. That is what changed with React - I no longer had to directly manipulate the DOM. I could just define a state to store data, write my JSX around it and leave the logic for re-rendering to React.

React has many advantages over Vanilla JS (declarative updates instead of imperative, component-based architecture, easier state management, unidirectional data flow), but the **state lies at the centre of it all**.

1. **Declarative updates**: Building UI around the state and not having to write the step-by-step process of finding and updating the UI manually.
2. **Unidirectional data flow**: Inter-component communication flows from parent to child, achieved by sharing state either through prop drilling or global state management.

## STATE IS NEITHER EPHEMERAL NOR PERMANENT

Unlike normal variables which are stored in memory and thus are ephemeral/temporary, state is different - it is stored **between renders**. This behavior is exactly why, when `setState` functions are executed, the new value gets updated in the UI. Setter functions are special - they make React remember the state's updated value.

However, React state is not permanent either. This can be proven by the fact that once a state gets updated and the user refreshes the page, the state falls back to the value it was initialized with.

## RENDERING vs. RECONCILIATION

React can render to multiple environments, with three main targets:

- **DOM** (Web)
- **iOS** (iPhones and iPads)
- **Android Views** (Android phones)

This is possible because **rendering** and **reconciliation** are separate processes. The reconciler figures out which parts of the app to update, while the renderer uses that information to update the actual app. React Native and React can have their own renderers, but they share the same reconciler provided by React core.

## VIRTUAL DOM

The concept of rendering only that part of the UI which has actually experienced updates - The Virtual DOM.
(Though it is increasingly being considered an unnecessary overhead by a lot of other similar libraries in the same domain, but let’s save that for another post.)

The idea behind VDOM was simple, react builds a copy of the DOM using current state, compares it with the previous VDOM and implements the differences into the original DOM. This leads to better performance, as React only had to update the affected nodes.

But how does it tie to state?

Well, state could be explained as the information that currently exists in a restricted scope within our app, with these add-ons :

1. React knows when a state gets updated
2. This powers the reactivity of rendered content,
   1. Function executes
   2. State updates
   3. Specific UI component re-renders

## THE EVENT LOOP

The Event Loop is the spine of the javascript engine. In order to unerstand it, it is important to familiarise ourselves with its components and certain facts related to them. It consists of the following components :

1. The call stack
2. Web /Node.js APIs
3. Macrotask Queue/Callback Queue/ Task Queue
4. Microtask Queue

The main component here is the call stack, which works on the recursive principle, whereby, it runs a function and runs the next function called within it(callback function), this process continues until the last function is executed and it returns, in which case we traverese down to empty the stack.

The Web /Node.js APIs run asynchronous tasks on a different thread from the main. They are given control when certain functions that are not part of the jvascript browser come up for execution, as a result, the functions get executed and return control to the parent macrotask whose child function it was.

The microtasks take higher priority than the macrotasks and it is the reason that after the execution of synchronous functions and when the call stack is empty, a function is picked from the macrotask queue and placed in the stack and executed, then, its microtask is executed immediately and this process keeps repeating, until there is no task left in the macrotask.

## STACK RECONCILER - THE OLD WAY

Before React V16, this is how React determined which part of the UI is to be updated, followed by a change in state. It was powered by ‘The Diffing Algorithm’ and Virtual DOM in the following way:

1. React keeps a copy of the DOM with the current state - a virtual DOM, always.
2. Upon every state/prop change, React creates a new Virtual DOM tree and compares it with the previous one.
3. The Diffing Algorithm is used to find the points of difference between the two Virtual DOMs.
4. The differences are applied by the Reconciliation Algorithm to the actual DOM.

## FIBRE - THE UPGRADE

Fibre is a complete rewrite of the Stack Reconciler for rendering and reconciliation, it was mainly designed to accomplish better responsiveness and concurrency. With Fibre, React can :

1. Break up the process of re-rendering into smaller tasks, called fibres
2. Assign different priorities to the tasks
3. Stop, resume or restart a task by priority.

The Call Stack powers javascript behind the scenes, even with fibre now which is an improved version of the call stack. Fibre is essentially a call stack with an extended set of operations to control it, earlier it could only be kicked off and it would stop once all of the rendering work was done, but now it can be turned on, paused, resumed, restarted and quit.

Fibre also gave birth to new hooks like - useTransition, useDeferredValue, useInsertionEffect, useId and useSyncExternalStore.
