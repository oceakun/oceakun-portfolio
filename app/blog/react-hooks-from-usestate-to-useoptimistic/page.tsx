import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';
import CodeBlock from '../_components/CodeBlock';
import Banner from '../_components/Banner';
import References from '../_components/References';
import Overview from '../_components/Overview';
import bannerImage from './banner.svg';
import { refs } from './references';
import { overviewContent } from './overviewContent';

export const metadata: Metadata = {
  title: 'React Hooks: From useState to useOptimistic',
  description:
    'A comprehensive guide to React Hooks, from basic useState to advanced useOptimistic, covering commonly used and lesser-known hooks.',
  openGraph: {
    title: 'React Hooks: From useState to useOptimistic',
    description:
      'A comprehensive guide to React Hooks, from basic useState to advanced useOptimistic, covering commonly used and lesser-known hooks.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Hooks: From useState to useOptimistic',
    description:
      'A comprehensive guide to React Hooks, from basic useState to advanced useOptimistic, covering commonly used and lesser-known hooks.',
  },
};

export default function BlogPage() {
  return (
    <section className='w-full'>
      <Banner src={bannerImage} alt='React Hooks Banner' />
      <BlogHeader
        title='React Hooks: From useState to useOptimistic'
        date='11-11-2025'
      />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify w-full '>
        <div className='text-justify w-full'>
          <Overview topics={overviewContent} />
          <h2
            id='introduction'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            Introduction
          </h2>
          <p>
            Hooks are an indispensable part of React, as they provide a bridge
            for developers to manipulate a webpage DOM through things like
            state, window size and a lot of native Javascript apis.
          </p>
          <h3
            id='commonly-used'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            The ones, most commonly used
          </h3>
          <p>
            In React projects, following hooks are most likely to be used (in
            the order they are mentioned):
          </p>
          <ul>
            <li>
              <strong>useState</strong> - Lets you manage your application state
              (which is a fancy word for special variables used by React to
              selectively re-render only that part of the UI which uses the
              state and hence needs to be updated, when it changes).
            </li>
            <li>
              <strong>useEffect</strong> - Lets you run a piece of code either
              on component mount and if there are values mentioned in its
              dependency array, then when the values change
            </li>
            <li>
              <strong>useRef</strong> - Lets you save a value across re-renders
            </li>
            <li>
              <strong>useContext</strong> - Lets you inject a parcel of states,
              variables and functions into the sub-components of a component
              wrapped in its context provider, across the app, given they have
              no hierarchical differences in the DOM.
            </li>
            <li>
              <strong>useMemo</strong> - Lets you save calculated values between
              re-renders
            </li>
            <li>
              <strong>useCallback</strong> - Lets you re-use old definitions of
              the function they wrap as long as none of their dependencies
              change
            </li>
          </ul>
          <p>
            The last two are incorrectly used a lot of times, which can be
            attributed to misconceptions relating to when and how they should be
            used. If I were to put it in one line, just be cautious while using
            them because <i>premature optimization is the root of all evil</i>.
          </p>
          <h3
            id='less-popular'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            Less popular, yet powerful
          </h3>
          <p>
            In addition to the above hooks, this article focuses on some others
            (that I myself came across recently). My special focus in this
            article will be on giving you a thorough explanation on when and how
            these relatively new hooks should be used and how they differ or
            relate, from or to the existing hooks.
          </p>
          <p>Here is a list of the new hooks:</p>
          <ul>
            <li>useLayoutEffect</li>
            <li>useDeferredValue</li>
            <li>useTransition</li>
            <li>useOptimistic</li>
            <li>useId</li>
            <li>useInsertionEffect</li>
            <li>useImperativeHandle</li>
          </ul>
          <h3
            id='running-example'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            A running example
          </h3>
          <p>
            Throughout this article, I'll be using examples from -{' '}
            <a
              href='https://team-pulse-three-alpha.vercel.app/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              <strong>TeamPulse Dashboard</strong>
            </a>
            , doing so will serve as practical examples for all the principles
            that will be discussed hereafter. <br />
            You could familiarise yourself with the code present here -{' '}
            <a
              href='https://github.com/oceakun/the-hooks-lesser-known/tree/main/the-hoooks-lesser-known'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              <strong>repo</strong>
            </a>
            .
          </p>
          <h2
            id='diving-in'
            className='text-xl dark:text-neutral-200 font-serif'
          >
            Diving in
          </h2>
          <h3
            id='useState'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useState
          </h3>
          <p>
            useState is the most commonly used hook in React projects. What it
            allows components to do, is very simple - store values of multiple
            datatypes, string, number, array or even interfaces, remember them
            between renders and trigger re-renders when those values change.
          </p>
          <p>
            In AddTaskForm.tsx, useState tracks multiple form fields and
            submission state:
          </p>
          <CodeBlock>{`const [title, setTitle] = useState('');
const [priority, setPriority] = useState<Task['priority']>('medium');
const [isSubmitting, setIsSubmitting] = useState(false);`}</CodeBlock>
          <p>
            In DashboardPage.tsx, useState holds fetched API data and loading
            states. Here, data changes trigger UI re-renders automatically to
            display updated charts:
          </p>
          <CodeBlock>{`const [lineData, setLineData] = useState<ChartData[]>([]);
const [barData, setBarData] = useState<ChartData[]>([]);
const [pieData, setPieData] = useState<ChartData[]>([]);
const [isLoading, setIsLoading] = useState(true);`}</CodeBlock>
          <p>
            In ThemeContext.tsx, useState uses an initializer function for
            initialization, the function runs only once on mount, avoiding
            expensive checks on every render.
          </p>
          <CodeBlock>{`const [theme, setTheme] = useState<Theme>(() => {
  const stored = localStorage.getItem('theme') as Theme;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
});`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>
                Use an initializer function (lazy initialization) when the
                initial value requires expensive computation, it only runs once
                on mount.
              </p>
            </li>
            <li>
              <p>
                State updates are asynchronous and batched. Use the functional
                form (setState(prev =&gt; prev + 1)) when the new state depends
                on the previous state.
              </p>
            </li>
            <li>
              <p>
                For complex state with multiple related values, consider
                useReducer instead of multiple useState calls.
              </p>
            </li>
          </ul>
          <h3
            id='useCallback'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useCallback
          </h3>
          <p>
            useCallback memoizes function references to prevent unnecessary
            re-creations. <br />
            How it works is this - wrap the function that gets passed to a child
            of the current component as a prop in a useCallback and populate its
            dependency array with all the reactive values. But there is a
            gotcha, the child component itself needs to be wrapped in a
            React.Memo in order to use the memoised prop as expected.
          </p>
          <p>
            In WidgetContainer.tsx, refreshAllWidgets is wrapped in a
            useCallback, which means that the Button components receiving these
            callbacks don't re-render unnecessarily when parent updates.
          </p>
          <CodeBlock>{`const refreshAllWidgets = useCallback(() => {
  widgetRefs.current.forEach((widget, id) => {
    widget.refresh();
  });
}, []);

const resetAllPositions = useCallback(() => {
  widgetRefs.current.forEach((widget, id) => {
    widget.resetPosition();
  });
}, []);`}</CodeBlock>
          <p>
            In useDragAndDrop.ts, stable handlers are crucial for event
            listeners because without it, the listeners would be removed and
            re-added on every render, causing the drag operations to feel janky.
          </p>
          <CodeBlock>{`const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  setDragState({
    isDragging: true,
    startX: e.clientX - position.x,
    startY: e.clientY - position.y,
    currentX: e.clientX,
    currentY: e.clientY,
  });
}, [position]);

const handleMouseMove = useCallback((e: MouseEvent) => {
  if (!dragState.isDragging) return;

  const newX = e.clientX - dragState.startX;
  const newY = e.clientY - dragState.startY;

  setPosition({ x: newX, y: newY });
}, [dragState.isDragging, dragState.startX, dragState.startY]);`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>Use it in the following situations:</p>
              <ul>
                <li>Passing functions as props to memoized child components</li>
                <li>
                  Using functions as dependencies in useEffect or other hooks
                </li>
                <li>Event handlers that set up/tear down event listeners</li>
              </ul>
            </li>
            <li>
              <p>
                The child component must be wrapped in React.memo for
                useCallback to provide any benefit, otherwise, the child
                re-renders regardless of stable function references.
              </p>
            </li>
          </ul>
          <h3
            id='useMemo'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useMemo
          </h3>
          <p>
            useMemo caches the result of expensive calculations between
            re-renders and recalculates them only when dependencies change.
          </p>
          <p>
            We calculate various statistics(in DashboardPage.tsx) and store them
            in the stats variable. In itself, calculating from hundreds of
            points is expensive, which is where useMemo comes in, it only allows
            re-calculation to happen if one of the source data(lineData,
            barData, pieData) changes.
          </p>
          <CodeBlock>{`const stats = useMemo(() => {
  const totalDataPoints = lineData.length + barData.length + pieData.length;
  const avgLineValue = lineData.length > 0
    ? lineData.reduce((sum, d) => sum + d.value, 0) / lineData.length
    : 0;

  return {
    totalDataPoints,
    avgLineValue: avgLineValue.toFixed(0),
    categories: new Set(lineData.map(d => d.category).filter(Boolean)).size,
  };
}, [lineData, barData, pieData]);`}</CodeBlock>
          <p>
            In LineChart.tsx, "moving average" calculation is memoized. This is
            done to avoid the visible lag in chart data being loaded on chart
            re-rendering which happens a lot during drag activity.
          </p>
          <CodeBlock>{`const processedData = useMemo(() => {
  console.log('Processing line chart data...');

  return data.map(item => ({
    ...item,
    average: data
      .slice(Math.max(0, data.indexOf(item) - 2), data.indexOf(item) + 1)
      .reduce((sum, d) => sum + d.value, 0) / 3,
  }));
}, [data]);`}</CodeBlock>
          <p>
            In TasksPage.tsx, filtering and sorting form a two-stage pipeline
            but with this many tasks, re-filtering and sorting on every
            keystroke would freeze the UI. The solution? wrap filteredTasks and
            sortedTasks in useMemo, so now, stage only recalculates when its
            specific dependencies change.
          </p>
          <CodeBlock>{`const filteredTasks = useMemo(() => {
  let filtered = tasks;

  if (deferredSearchQuery) {
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(deferredSearchQuery.toLowerCase())
    );
  }

  if (filterBy !== 'all') {
    filtered = filtered.filter(task =>
      filterBy === 'completed' ? task.completed : !task.completed
    );
  }

  return filtered;
}, [tasks, deferredSearchQuery, filterBy]);

const sortedTasks = useMemo(() => {
  const sorted = [...filteredTasks];

  switch (sortBy) {
    case 'date':
      sorted.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      sorted.sort((a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      break;
  }

  return sorted;
}, [filteredTasks, sortBy]);`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>Use it in the following situations:</p>
              <ul>
                <li>
                  Expensive calculations (filtering/sorting a large number of
                  items, complex mathematical operations)
                </li>
                <li>
                  Maintaining referential equality for objects/arrays passed to
                  memoized children
                </li>
                <li>Derived state that depends on multiple props or state</li>
              </ul>
            </li>
            <li>
              <p>
                useMemo adds overhead (memory and comparison logic), so only use
                it when the calculation is genuinely expensive or when
                preventing re-renders through referential equality.
              </p>
            </li>
          </ul>
          <h3
            id='useContext'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useContext
          </h3>
          <p>
            useContext allows components to access global state without prop
            drilling. It subscribes a component to a context, re-rendering it
            whenever the context value changes.
          </p>
          <p>
            Over 20 components need theme access in TeamPulse. Passing props
            through every level would be difficult and it'll cause a lot of
            code-addition. To avoid it, we just setup a global theme context in
            ThemeContext.ts file which can be accessed by any component via
            useTheme(our custom theme hook).
          </p>
          <CodeBlock>{`const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const { theme, toggleTheme } = useTheme();`}</CodeBlock>
          <p>In SettingsContext.tsx, global configuration is shared:</p>
          <CodeBlock>{`export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

const { settings } = useSettings();`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              useContext() in a component isn't affected by providers returned
              from the same component, it looks upward in the tree.
            </li>
            <li>
              Even if a component is wrapped in React.memo, it re-renders when
              context values change. This is expected behavior for context
              consumers.
            </li>
            <li>
              Putting high-frequency updates in context should be avoided (like
              mouse position), as all consumers re-render on every change.
            </li>
          </ul>
          <h3
            id='useEffect'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useEffect
          </h3>
          <p>
            useEffect is used to, run side effects (or synchronize components)
            with external systems like
            <ul>
              <li>API calls</li>
              <li>Subscriptions</li>
              <li>Timers</li>
              <li>DOM operations</li>
            </ul>
            It runs after render and can optionally clean up before the next
            effect or unmount. Additionally, it runs whenever any of the values
            in its dependency array change.
          </p>
          <p>
            In DashboardPage.tsx, chart data is loaded on component mount(empty
            dependency array ensures this runs only once)
          </p>
          <CodeBlock>{`useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [line, bar, pie] = await Promise.all([
        mockApi.getChartData('line'),
        mockApi.getChartData('bar'),
        mockApi.getChartData('pie'),
      ]);
      setLineData(line);
      setBarData(bar);
      setPieData(pie);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);`}</CodeBlock>
          <p>
            Real-time updates are subscribed to with proper cleanup because
            without it, re-renders would create multiple subscriptions, causing
            memory leaks and duplicate updates.
          </p>
          <CodeBlock>{`useEffect(() => {
  const unsubscribe = mockApi.subscribeToLiveData((newData) => {
    setLineData(prev => [...prev.slice(-11), newData]);
  });

  return () => {
    unsubscribe();
  };
}, []);`}</CodeBlock>
          <p>
            Also, configurable auto-refresh is implemented so that when settings
            change, the old interval is cleared and a new one is created with
            the updated value.
          </p>
          <CodeBlock>{`useEffect(() => {
  if (!settings.refreshInterval) return;

  const refreshData = async () => {
    const [line, bar] = await Promise.all([
      mockApi.getChartData('line'),
      mockApi.getChartData('bar'),
    ]);
    setLineData(line);
    setBarData(bar);
  };

  const interval = setInterval(refreshData, settings.refreshInterval);
  return () => clearInterval(interval);
}, [settings.refreshInterval]);`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>
                Passing/not passing any values in the dependency array behavior
                results into the following behaviours
              </p>
              <ul>
                <li>Empty array [] - runs once on mount</li>
                <li>No array - runs on mount and after every re-render</li>
                <li>With dependencies - runs when any dependency changes</li>
              </ul>
            </li>
            <li>
              Following steps are followed to ensure proper cleanup before the
              next effect execution (when dependencies change):
              <ul>
                <li>cleanup runs with old values </li>
                <li>component re-renders</li>
                <li>effect runs with new values</li>
              </ul>
            </li>
          </ul>
          <h3
            id='useDeferredValue'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useDeferredValue
          </h3>
          <p>
            useDeferredValue lets you defer updating a part of the UI to keep
            other updates responsive. It creates a "deferred" version of a value
            that lags behind the urgent version, allowing React to prioritize
            more important updates.
          </p>
          <p>
            In TasksPage.tsx, search input stays responsive even with expensive
            filtering because with so many tasks, filtering on every keystroke
            would make typing feel laggy. It keeps the input responsive by
            allowing React to update it immediately while deferring the
            expensive filtering operation.
            <br />
            This means, input updates instantly, results update slightly
            delayed. Users can continue typing without interruption while the
            expensive filtering happens in the background.
          </p>
          <CodeBlock>{`const [searchQuery, setSearchQuery] = useState('');
const deferredSearchQuery = useDeferredValue(searchQuery);

const filteredTasks = useMemo(() => {
  let filtered = tasks;

  if (deferredSearchQuery) {
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(deferredSearchQuery.toLowerCase())
    );
  }

  return filtered;
}, [tasks, deferredSearchQuery]);

const isFiltering = searchQuery !== deferredSearchQuery;`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>When to use:</p>
              <ul>
                <li>Search inputs with expensive filtering or rendering</li>
                <li>Any value that triggers heavy computation on change</li>
                <li>Keeping text inputs responsive while updating lists</li>
              </ul>
            </li>
            <li>
              <p>useDeferredValue vs useTransition:</p>
              <ul>
                <li>
                  useDeferredValue - Use when you don't control the state update
                  (e.g., value comes from props)
                </li>
                <li>
                  useTransition - Use when you control the setState call and
                  want to mark it as low priority
                </li>
              </ul>
            </li>
            <li>
              <p>
                Compare the immediate value with the deferred value to detect
                pending state (searchQuery !== deferredSearchQuery) and show
                loading indicators.
              </p>
            </li>
          </ul>
          <h3
            id='useLayoutEffect'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useLayoutEffect
          </h3>
          <p>
            useLayoutEffect is identical to useEffect but fires synchronously
            before the browser paints the screen. This prevents visual flicker
            when you need to measure or mutate the DOM before users see it.
          </p>
          <p>
            In ThemeContext.tsx, theme changes happen before paint to prevent
            "flash of wrong theme", all thanks to useLayoutEffect. Had we used
            useEffect instead, users would see a brief flash of the wrong theme
            before the correct one got applied.
          </p>
          <CodeBlock>{`useLayoutEffect(() => {
  const root = document.documentElement;

  root.classList.remove('light', 'dark');

  root.classList.add(theme);

  localStorage.setItem('theme', theme);
}, [theme]);`}</CodeBlock>
          <p>
            Another example would be of useDragAndDrop.ts, where cursor and
            listeners update immediately during drag, making dragging feel
            native and responsive. In comparison, drag operations would have
            felt sluggish with useEffect's async timing.
          </p>
          <CodeBlock>{`useLayoutEffect(() => {
  if (dragState.isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }
}, [dragState.isDragging, handleMouseMove, handleMouseUp]);`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>Timing comparison:</p>
              <ul>
                <li>
                  useEffect: React renders → Browser paints → useEffect runs
                </li>
                <li>
                  useLayoutEffect: React renders → useLayoutEffect runs →
                  Browser paints
                </li>
              </ul>
            </li>
            <li>
              <p>When to use:</p>
              <ul>
                <li>Preventing visual flicker (theme changes, animations)</li>
                <li>Measuring DOM elements before paint</li>
                <li>Synchronous DOM mutations</li>
              </ul>
            </li>
            <li>
              <p>
                useLayoutEffect blocks visual updates. Use sparingly—prefer
                useEffect unless you need synchronous DOM access.
              </p>
            </li>
          </ul>
          <h3
            id='useInsertionEffect'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useInsertionEffect
          </h3>
          <p>
            useInsertionEffect is a specialized hook for CSS-in-JS libraries. It
            fires before any DOM mutations, even before useLayoutEffect, making
            it perfect for injecting style tags that need to be present before
            any layout calculations.
          </p>
          <p>
            In ThemeContext.tsx, CSS variables must be available before any
            component reads computed styles. useInsertionEffect ensures the
            earliest possible injection.
          </p>
          <CodeBlock>{`useInsertionEffect(() => {
  const style = document.createElement('style');
  style.id = 'dynamic-theme-vars';

  const cssVars = theme === 'dark'
    ? \`
      :root {
        --theme-bg-primary: #0f172a;
        --theme-bg-secondary: #1e293b;
        --theme-text-primary: #f1f5f9;
        --theme-text-secondary: #cbd5e1;
        --theme-border: #334155;
        --theme-accent: #3b82f6;
      }
    \`
    : \`
      :root {
        --theme-bg-primary: #ffffff;
        --theme-bg-secondary: #f8fafc;
        --theme-text-primary: #0f172a;
        --theme-text-secondary: #475569;
        --theme-border: #e2e8f0;
        --theme-accent: #2563eb;
      }
    \`;

  style.textContent = cssVars;

  const existing = document.getElementById('dynamic-theme-vars');
  if (existing) existing.remove();

  document.head.appendChild(style);

  return () => style.remove();
}, [theme]);`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>Execution order:</p>
              <CodeBlock>{`useInsertionEffect → useLayoutEffect → Browser Paint → useEffect`}</CodeBlock>
            </li>
            <li>
              <p>When to use:</p>
              <ul>
                <li>CSS-in-JS library development</li>
                <li>Dynamic style injection that affects layout</li>
                <li>Inserting global styles before component renders</li>
              </ul>
            </li>
          </ul>
          <h3
            id='useRef'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useRef
          </h3>
          <p>
            useRef creates a mutable reference that persists across re-renders
            without triggering updates when changed. It has two main uses:
            accessing DOM elements and storing mutable values.
          </p>
          <p>
            In useDragAndDrop.ts, useRef accesses the DOM node for drag
            calculation via .current, which doesn't trigger re-renders, making
            it perfect for values that don't affect the visual output.
          </p>
          <CodeBlock>{`const elementRef = useRef<HTMLDivElement>(null);
const initialPosRef = useRef<Position>(initialPosition);

const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  if (elementRef.current) {
    const rect = elementRef.current.getBoundingClientRect();
  }
};`}</CodeBlock>
          <p>
            In WidgetContainer.tsx, useRef stores a Map of child component
            handles, whereas, storing the Map in state would cause unnecessary
            re-renders on every update
          </p>
          <CodeBlock>{`const widgetRefs = useRef<Map<string, WidgetHandle>>(new Map());

widgetRefs.current.forEach((widget, id) => {
  widget.refresh();
});`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>useRef vs useState:</p>
              <CodeBlock>{`const [intervalId, setIntervalId] = useState<number | null>(null);

const intervalIdRef = useRef<number | null>(null);`}</CodeBlock>
            </li>
            <li>
              <p>When to use:</p>
              <ul>
                <li>Accessing DOM elements (refs)</li>
                <li>
                  Storing mutable values that don't affect render (timers,
                  previous values)
                </li>
                <li>Keeping references to objects across renders</li>
              </ul>
            </li>
            <li>
              <p>
                If changing the value should trigger a re-render, use useState.
                If not, use useRef.
              </p>
            </li>
          </ul>
          <h3
            id='useImperativeHandle'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useImperativeHandle
          </h3>
          <p>
            useImperativeHandle customizes the ref value exposed to parent
            components when using forwardRef. Instead of exposing the entire DOM
            element, we can expose only specific methods.
          </p>
          <p>
            In DraggableWidget.tsx, a custom API is exposed to parent
            components:
          </p>
          <CodeBlock>{`export interface WidgetHandle {
  refresh: () => void;
  resetPosition: () => void;
  getPosition: () => { x: number; y: number };
}

export const DraggableWidget = forwardRef<WidgetHandle, DraggableWidgetProps>(
  ({ children, title, initialPosition }, ref) => {
    const [refreshKey, setRefreshKey] = useState(0);
    const { position, reset } = useDragAndDrop(initialPosition);

    useImperativeHandle(
      ref,
      () => ({
        refresh: () => {
          console.log(\`Refreshing widget: \${title}\`);
          setRefreshKey(prev => prev + 1);
        },
        resetPosition: () => {
          reset();
        },
        getPosition: () => position,
      }),
      [title, position, reset]
    );

    return <div>...</div>;
  }
);`}</CodeBlock>
          <p>
            Parent needs to control multiple child widgets imperatively without
            exposing internal implementation details. The alternative (lifting
            state up) would be complex and cause unnecessary re-renders.
          </p>
          <CodeBlock>{`const widgetRefs = useRef<Map<string, WidgetHandle>>(new Map());

const refreshAllWidgets = useCallback(() => {
  widgetRefs.current.forEach((widget, id) => {
    widget.refresh();
  });
}, []);

<DraggableWidget
  ref={(el) => {
    if (el) widgetRefs.current.set(widget.id, el);
  }}
/>`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>When to use:</p>
              <ul>
                <li>Creating reusable component libraries</li>
                <li>Exposing imperative APIs (focus, play, pause)</li>
                <li>
                  Hiding implementation details while allowing parent control
                </li>
              </ul>
            </li>
            <li>
              <p>
                {' '}
                We should use it only when imperative control is genuinely
                needed, otherwise, declarative patterns (props and state should
                be preferred.
              </p>
            </li>
          </ul>
          <h3
            id='useId'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useId
          </h3>
          <p>
            useId generates unique, stable IDs that work correctly with
            server-side rendering (SSR). It ensures accessibility by properly
            associating form labels, inputs, and ARIA attributes.
          </p>
          <p>
            In AddTaskForm.tsx, useId creates stable IDs for form accessibility.
            This way, form fields are properly associated with labels for screen
            readers. Moreover, IDs are unique across the app with no collisions,
            and they remain stable across server/client renders.
          </p>
          <CodeBlock>{`const titleId = useId();
const priorityId = useId();
const formId = useId();

const errorId = \`\${formId}-error\`;
const helpId = \`\${formId}-help\`;

<form id={formId} aria-describedby={error ? errorId : helpId}>
  <label htmlFor={titleId}>Task Title</label>
  <input
    id={titleId}
    aria-invalid={error ? 'true' : 'false'}
    aria-describedby={error ? errorId : undefined}
  />

  <label htmlFor={priorityId}>Priority</label>
  <select id={priorityId}>...</select>

  {error && (
    <div id={errorId} role="alert">
      {error}
    </div>
  )}

  <p id={helpId}>
    Add tasks with different priorities
  </p>
</form>`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>
                <strong>When to use:</strong>
              </p>
              <ul>
                <li>Form label/input associations</li>
                <li>ARIA attributes (aria-describedby, aria-labelledby)</li>
                <li>
                  Any case requiring unique IDs across component instances
                </li>
              </ul>
            </li>
            <li>
              <p>
                useId generates matching IDs on server and client, preventing
                hydration mismatches that would occur with random IDs.
              </p>
            </li>
          </ul>
          <h3
            id='useTransition'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useTransition
          </h3>
          <p>
            useTransition marks state updates as non-urgent transitions,
            allowing React to interrupt them for more important updates. This
            keeps the UI responsive during expensive operations by letting React
            prioritize urgent updates like user input.
          </p>
          <p>
            In TaskList.tsx, task updates don't block the UI. As a result, UI
            stays responsive during async task updates. This is primarily
            because, React marks the setState as "low priority" and can
            interrupt it if the user interacts with the page.
          </p>
          <CodeBlock>{`const [isPending, startTransition] = useTransition();

const handleToggle = async (id: string) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  addOptimisticUpdate({ type: 'toggle', id });

  try {
    const updated = await mockApi.updateTask(id, { completed: !task.completed });

    startTransition(() => {
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    });
  } catch (error) {
    console.error('Failed to toggle task:', error);
  }
};`}</CodeBlock>
          <p>
            In AddTaskForm.tsx, form resets don't block subsequent interactions.
            If the user immediately starts typing in the form again, React can
            prioritize that input over the form reset, preventing input lag.
          </p>
          <CodeBlock>{`const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const newTask = await mockApi.addTask(title.trim(), priority);

    startTransition(() => {
      onTaskAdded(newTask);
      setTitle('');
      setPriority('medium');
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};`}</CodeBlock>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>useTransition vs useDeferredValue:</p>
              <ul>
                <li>
                  useTransition - We control which state updates are transitions
                  (wrap setState calls)
                </li>
                <li>
                  useDeferredValue - React defers the value automatically (no
                  control over setState)
                </li>
              </ul>
            </li>
          </ul>
          <h3
            id='useOptimistic'
            className='text-lg dark:text-neutral-200 font-serif mt-6'
          >
            useOptimistic
          </h3>
          <p>
            useOptimistic enables instant UI updates before server confirmation.
            It automatically rolls back changes if the operation fails,
            providing native app-like responsiveness without manual undo logic.
          </p>
          <p>
            In TaskList.tsx, tasks update instantly with automatic rollback:
          </p>
          <CodeBlock>{`const [optimisticTasks, addOptimisticUpdate] = useOptimistic<Task[], OptimisticAction>(
  tasks,
  (state, action) => {
    switch (action.type) {
      case 'toggle':
        return state.map(task =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        );

      case 'delete':
        return state.filter(task => task.id !== action.id);

      default:
        return state;
    }
  }
);

const handleToggle = async (id: string) => {
  addOptimisticUpdate({ type: 'toggle', id });

  try {
    await mockApi.updateTask(id, { completed: !task.completed });
  } catch (error) {
    alert('Failed to update task');
  }
};`}</CodeBlock>
          <p>
            Users see instant feedback before the server responds (typically
            300-500ms). If the operation fails, the UI automatically reverts
            without manual undo logic.
          </p>
          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              <p>When to use:</p>
              <ul>
                <li>Form submissions that update the UI</li>
                <li>Toggle operations (likes, checkboxes, favorites)</li>
                <li>Delete operations with optimistic removal</li>
                <li>Any operation where instant feedback improves UX</li>
              </ul>
            </li>

            <li>
              <p>
                It's better than manual optimistic updates because automatic
                rollback on failure is safer and requires less code than
                manually tracking and undoing optimistic changes.
              </p>
            </li>
          </ul>
          <h2
            id='things-to-note'
            className='text-xl dark:text-neutral-200 font-serif mt-8'
          >
            A few things to note
          </h2>
          <p>
            While hooks are powerful, they're often misused. Here are common
            mistakes and when to avoid using certain hooks, illustrated with
            examples from real-world scenarios.
          </p>
          <ul>
            <li>
              Overusing useMemo and useCallback: The most common mistake is
              premature optimization. These hooks add overhead, so don't use
              them unless there's a measurable benefit.
            </li>
            <li>
              When to actually use:
              <ul>
                <li>
                  useMemo: Expensive calculations (filtering a lot of items,
                  complex mathematical operations)
                </li>
                <li>
                  useCallback: Passing to memoized child components or as effect
                  dependencies
                </li>
              </ul>
            </li>
            <li>
              Using Context for High-Frequency Updates: Context causes all
              consumers to re-render when any value changes. Avoid it for
              rapidly changing values.
            </li>

            <li>
              Storing Non-Reactive Values in State: If a value doesn't affect
              rendering, don't store it in state, use useRef instead.
            </li>

            <li>
              Side Effects in Render: Never perform side effects directly in the
              component body, always use useEffect.
            </li>

            <li>
              Excessive useEffect Dependencies: Adding too many dependencies can
              cause infinite loops or excessive re-runs.
            </li>

            <li>
              Forgetting useEffect Cleanup: Always clean up subscriptions,
              timers, and event listeners to prevent memory leaks.
            </li>
          </ul>
        </div>
      </div>
      <div id='references'>
        <References refs={refs} />
      </div>
    </section>
  );
}
