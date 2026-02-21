import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';
import CodeBlock from '../_components/CodeBlock';
import Overview from '../_components/Overview';
import References from '../_components/References';
import { overviewContent } from './overviewContent';
import { refs } from './references';

export const metadata: Metadata = {
  title: 'Anatomy of React State',
  description:
    'Deep dive into React state management - from useState internals to state updates, batching, reconciliation, and the mental model you need to master React state.',
  openGraph: {
    title: 'Anatomy of React State',
    description:
      'Deep dive into React state management - from useState internals to state updates, batching, reconciliation, and the mental model you need to master React state.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anatomy of React State',
    description:
      'Deep dive into React state management - from useState internals to state updates, batching, reconciliation, and the mental model you need to master React state.',
  },
};

export default function BlogPage() {
  return (
    <section className='w-full'>
      <BlogHeader title='Anatomy of React State' date='10-01-2026' />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify w-full'>
        <div className='text-justify w-full'>
          <Overview topics={overviewContent} />

          <h2
            id='introduction'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            Introduction: What is State?
          </h2>
          <p>
            State is React's way of making components remember information
            between renders. But to truly understand state, we need to look
            beyond the API and understand what happens when you call{' '}
            <code>setState</code>.
          </p>
          <p>
            In this article, we'll dissect React state from the ground up -
            exploring the internals, the mental models, and the patterns that
            separate good React code from great React code.
          </p>

          <h2
            id='fiber-architecture'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            The React Fiber Architecture
          </h2>
          <p>
            Before we dive into state, we need to understand React's Fiber
            architecture. Fiber is React's reconciliation algorithm - the engine
            that decides what needs to update when state changes.
          </p>
          <p>
            <strong>Key concepts:</strong>
          </p>
          <ul>
            <li>Each component instance has a corresponding Fiber node</li>
            <li>
              Fiber nodes form a tree structure parallel to your component tree
            </li>
            <li>State is stored on the Fiber node, not in your component</li>
            <li>
              When state updates, React schedules work to reconcile the tree
            </li>
          </ul>

          <h2
            id='usestate-internals'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            How useState Works Under the Hood
          </h2>
          <p>
            When you call <code>useState</code>, React doesn't store state "in
            your component." Instead, it stores state in a linked list of hooks
            attached to the component's Fiber node.
          </p>
          <CodeBlock>{`function Component() {
  const [count, setCount] = useState(0);  // Hook #1
  const [name, setName] = useState('');   // Hook #2
  const [active, setActive] = useState(false);  // Hook #3

  // React maintains a linked list:
  // Fiber.memoizedState -> Hook1 -> Hook2 -> Hook3
}`}</CodeBlock>
          <p>
            This is why hooks must be called in the same order on every render -
            React relies on call order to match hooks with their stored state.
          </p>

          <h2
            id='state-updates-batching'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            State Updates and Batching
          </h2>
          <p>
            One of the most misunderstood aspects of React state is how updates
            are batched. As of React 18,{' '}
            <strong>all state updates are automatically batched</strong>, even
            in async functions.
          </p>
          <CodeBlock>{`function handleClick() {
  setCount(c => c + 1);
  setName('John');
  setActive(true);

  // React batches all three updates into a single re-render
}`}</CodeBlock>
          <p>
            <strong>Before React 18:</strong> Batching only worked in event
            handlers
          </p>
          <p>
            <strong>After React 18:</strong> Batching works everywhere
            (promises, setTimeout, native events)
          </p>

          <h3
            id='sync-vs-async'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            Synchronous vs Asynchronous Updates
          </h3>
          <p>State updates are scheduled, not immediate:</p>
          <CodeBlock>{`const [count, setCount] = useState(0);

function handleClick() {
  setCount(1);
  console.log(count);  // Still 0! Update hasn't happened yet

  // To use the updated value, use the callback form:
  setCount(prev => {
    console.log(prev);  // This will be 1
    return prev + 1;
  });
}`}</CodeBlock>

          <h2
            id='reconciliation'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            Reconciliation and Re-renders
          </h2>
          <p>
            When state changes, React doesn't immediately update the DOM.
            Instead, it triggers a reconciliation process:
          </p>
          <ol>
            <li>
              <strong>Schedule Update:</strong> Mark the Fiber node as needing
              work
            </li>
            <li>
              <strong>Render Phase:</strong> Call your component function to get
              new JSX
            </li>
            <li>
              <strong>Reconciliation:</strong> Compare new JSX with previous
              render
            </li>
            <li>
              <strong>Commit Phase:</strong> Update only the changed DOM nodes
            </li>
          </ol>

          <h3
            id='triggers-rerenders'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            What Triggers Re-renders?
          </h3>
          <ul>
            <li>State changes in the component</li>
            <li>Props changes (parent re-rendered with new props)</li>
            <li>Context value changes</li>
            <li>Parent component re-renders (unless memoized)</li>
          </ul>

          <h2
            id='state-vs-props'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            State vs Props: When to Use What
          </h2>
          <p>
            The golden rule:{' '}
            <strong>
              Use state for data that changes over time. Use props for data that
              flows down.
            </strong>
          </p>
          <CodeBlock>{`// State - component owns and manages this data
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Props - parent provides this data
function Display({ count }) {
  return <div>Count: {count}</div>;
}`}</CodeBlock>

          <h2
            id='pitfalls'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            Common Pitfalls and Anti-patterns
          </h2>

          <h3
            id='stale-closures'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            1. Stale Closures
          </h3>
          <CodeBlock>{`const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1);  // ❌ Always increments from initial value
  }, 1000);

  return () => clearInterval(interval);
}, []); // Empty deps means count is stale

// Fix: Use callback form
setCount(c => c + 1);  // ✅ Always uses latest value`}</CodeBlock>

          <h3
            id='derived-state'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            2. Derived State
          </h3>
          <CodeBlock>{`// ❌ Bad - storing derived state
const [items, setItems] = useState([]);
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(items.length);  // Unnecessary state
}, [items]);

// ✅ Good - calculate during render
const [items, setItems] = useState([]);
const count = items.length;  // Just derive it!`}</CodeBlock>

          <h3
            id='initializing-from-props'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            3. Initializing State from Props
          </h3>
          <CodeBlock>{`// ❌ Anti-pattern - props changes won't update state
function Component({ initialValue }) {
  const [value, setValue] = useState(initialValue);
  // If initialValue prop changes, value state stays the same!
}

// ✅ Option 1: Use props directly if you don't need to modify
function Component({ value }) {
  return <div>{value}</div>;
}

// ✅ Option 2: Use key to reset state
<Component key={id} initialValue={value} />

// ✅ Option 3: Use useEffect to sync (rare cases)
useEffect(() => {
  setValue(initialValue);
}, [initialValue]);`}</CodeBlock>

          <h2
            id='colocation'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            State Colocation and Lifting State Up
          </h2>

          <h3
            id='colocation-close'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            Colocation: Keep State Close to Where It's Used
          </h3>
          <CodeBlock>{`// ❌ Bad - state in parent, only used by child
function Parent() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <OtherStuff />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

// ✅ Good - state in Modal component
function Modal() {
  const [open, setOpen] = useState(false);
  // Modal manages its own state
}`}</CodeBlock>

          <h3
            id='lifting-state'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            Lifting State Up: Share State Between Siblings
          </h3>
          <CodeBlock>{`// When siblings need to share state, lift it to parent
function Parent() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Sidebar selected={selected} onSelect={setSelected} />
      <Content selected={selected} />
    </>
  );
}`}</CodeBlock>

          <h2
            id='performance'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            Performance Optimization Techniques
          </h2>

          <h3
            id='lazy-initial-state'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            1. Lazy Initial State
          </h3>
          <CodeBlock>{`// ❌ Expensive calculation runs on every render
const [data, setData] = useState(expensiveComputation());

// ✅ Lazy initializer runs only once
const [data, setData] = useState(() => expensiveComputation());`}</CodeBlock>

          <h3
            id='bail-out'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            2. Bail Out of Updates
          </h3>
          <CodeBlock>{`// React skips re-render if new state === old state (Object.is comparison)
const [count, setCount] = useState(0);
setCount(0);  // No re-render if count is already 0

// For objects, use immutable updates
const [user, setUser] = useState({ name: 'John', age: 30 });
setUser(prev => prev);  // No re-render - same object reference
setUser({ ...user });   // Re-renders - new object reference`}</CodeBlock>

          <h3
            id='state-splitting'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            3. State Splitting
          </h3>
          <CodeBlock>{`// ❌ One state object - updating firstName re-renders everything
const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });

// ✅ Split state - independent updates
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');`}</CodeBlock>

          <h2
            id='mental-model'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            The Mental Model
          </h2>
          <p>To master React state, internalize these principles:</p>
          <ol>
            <li>
              <strong>State is a snapshot:</strong> Each render sees state at
              that moment in time
            </li>
            <li>
              <strong>Updates are scheduled:</strong> setState doesn't update
              immediately
            </li>
            <li>
              <strong>Batching is automatic:</strong> Multiple setState calls =
              one re-render
            </li>
            <li>
              <strong>State lives in Fiber:</strong> Not in your component, in
              React's internal tree
            </li>
            <li>
              <strong>Immutability matters:</strong> React uses reference
              equality to detect changes
            </li>
            <li>
              <strong>Closures capture state:</strong> Functions inside
              useEffect see state from when they were created
            </li>
          </ol>

          <h2
            id='conclusion'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            Conclusion
          </h2>
          <p>
            Understanding React state at this level transforms how you write
            components. You'll make better decisions about when to use state,
            how to structure it, and how to optimize performance.
          </p>
          <p>
            The key is to think in terms of React's execution model: renders are
            snapshots, updates are scheduled, and React optimizes when possible.
            Master these concepts, and React state becomes intuitive rather than
            mysterious.
          </p>
        </div>
      </div>
      <div id='references'>
        <References refs={refs} />
      </div>
    </section>
  );
}
