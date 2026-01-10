import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';

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
    <section>
      <BlogHeader
        title='React Hooks: From useState to useOptimistic'
        date='11-11-2025'
      />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Content</h2>
          <ul>
            <li>Introduction to hooks</li>
            <li>The ones, most commonly used</li>
            <li>Less popular, yet powerful</li>
            <li>
              Diving in
              <ul>
                <li>useState - Managing component state</li>
                <li>useCallback - Memoizing function references</li>
                <li>useMemo - Caching expensive calculations</li>
                <li>useContext - Global state sharing</li>
                <li>useEffect - Side effects and synchronization</li>
                <li>useDeferredValue - Non-blocking UI updates</li>
                <li>useLayoutEffect - Synchronous DOM updates</li>
                <li>useInsertionEffect - CSS injection before paint</li>
                <li>useRef - Persisting values and DOM access</li>
                <li>useImperativeHandle - Custom ref APIs</li>
                <li>useId - Stable unique IDs</li>
                <li>useTransition - Mark non-urgent updates</li>
                <li>useOptimistic - Instant UI updates with rollback</li>
              </ul>
            </li>
            <li>Precautions: When NOT to use hooks</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Introduction to hooks
          </h2>
          <p>
            Hooks are an indispensable part of React, as they provide a bridge
            for developers to manipulate a webpage DOM through things like
            state, window size and a lot of native Javascript apis.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            The ones, most commonly used
          </h2>
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
              <strong>useCallback</strong> - Lets you re-use old function
              definitions as long as none of their dependencies change
            </li>
          </ul>
          <p>
            The last two are incorrectly used a lot of times, which can be
            attributed to misconceptions relating to when and how they should be
            used. If I were to put it in one line, just be cautious while using
            them because premature optimization is the root of all evil.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Less popular, yet powerful
          </h2>
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

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Diving in
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useState
          </h3>
          <p>
            useState is the foundation of React state management. It allows
            components to remember values between renders and triggers
            re-renders when those values change.
          </p>
          <p>
            <strong>Real-world use cases from TeamPulse Dashboard:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. Form Input Management
          </h4>
          <p>
            In AddTaskForm.tsx, useState tracks multiple form fields and
            submission state:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const [title, setTitle] = useState('');
const [priority, setPriority] = useState<Task['priority']>('medium');
const [isSubmitting, setIsSubmitting] = useState(false);`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Track form field values and
            submission state synchronously. Each state change triggers a
            re-render to update the UI.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Data Storage for Charts
          </h4>
          <p>
            In DashboardPage.tsx, useState holds fetched API data and loading
            states:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const [lineData, setLineData] = useState<ChartData[]>([]);
const [barData, setBarData] = useState<ChartData[]>([]);
const [pieData, setPieData] = useState<ChartData[]>([]);
const [isLoading, setIsLoading] = useState(true);`}</code>
          </pre>
          <p>
            <strong>Why useState:</strong> Data changes need to trigger UI
            re-renders automatically to display updated charts.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            3. Lazy Initialization with Functions
          </h4>
          <p>
            In ThemeContext.tsx, useState uses an initializer function for
            expensive initialization:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const [theme, setTheme] = useState<Theme>(() => {
  const stored = localStorage.getItem('theme') as Theme;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
});`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Initialize theme from localStorage
            or system preference. The function runs only once on mount, avoiding
            expensive checks on every render.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useCallback
          </h3>
          <p>
            useCallback memoizes function references to prevent unnecessary
            re-creations. While powerful, it should only be used when there's a
            measurable performance benefit, as premature optimization can make
            code harder to maintain.
          </p>
          <p>
            <strong>Genuine use cases from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. Event Handlers for Child Components
          </h4>
          <p>
            In WidgetContainer.tsx, stable callbacks prevent child button
            re-renders:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const refreshAllWidgets = useCallback(() => {
  widgetRefs.current.forEach((widget, id) => {
    widget.refresh();
  });
}, []); // Never changes, safe to pass to child buttons

const resetAllPositions = useCallback(() => {
  widgetRefs.current.forEach((widget, id) => {
    widget.resetPosition();
  });
}, []);`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Button components receiving these
            callbacks don't re-render unnecessarily when parent updates.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Drag Operation Handlers
          </h4>
          <p>
            In useDragAndDrop.ts, stable handlers are crucial for event
            listeners:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
}, [dragState.isDragging, dragState.startX, dragState.startY]);`}</code>
          </pre>
          <p>
            <strong>Why useCallback:</strong> Prevents removing and re-adding
            event listeners on every render, which would cause drag operations
            to feel janky.
          </p>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>Passing functions as props to memoized child components</li>
            <li>Using functions as dependencies in useEffect or other hooks</li>
            <li>Event handlers that set up/tear down event listeners</li>
          </ul>

          <p>
            <strong>When NOT to use:</strong>
          </p>
          <ul>
            <li>Simple event handlers that don't cause performance issues</li>
            <li>Functions that aren't passed to child components</li>
            <li>
              Premature optimization without measuring actual performance impact
            </li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useMemo
          </h3>
          <p>
            useMemo caches the result of expensive calculations between
            re-renders. Only recalculate when dependencies change, improving
            performance for heavy operations.
          </p>
          <p>
            <strong>Real-world use cases from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. Dashboard Statistics Aggregation
          </h4>
          <p>
            In DashboardPage.tsx, statistics are recalculated only when data
            changes:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const stats = useMemo(() => {
  const totalDataPoints = lineData.length + barData.length + pieData.length;
  const avgLineValue = lineData.length > 0
    ? lineData.reduce((sum, d) => sum + d.value, 0) / lineData.length
    : 0;

  return {
    totalDataPoints,
    avgLineValue: avgLineValue.toFixed(0),
    categories: new Set(lineData.map(d => d.category).filter(Boolean)).size,
  };
}, [lineData, barData, pieData]);`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Aggregating data from hundreds of
            points is expensive. useMemo prevents recalculation on every render,
            only updating when source data changes.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Chart Data Transformation
          </h4>
          <p>In LineChart.tsx, moving average calculation is memoized:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const processedData = useMemo(() => {
  console.log('Processing line chart data...'); // Only logs when data changes

  return data.map(item => ({
    ...item,
    // Calculate 3-point moving average
    average: data
      .slice(Math.max(0, data.indexOf(item) - 2), data.indexOf(item) + 1)
      .reduce((sum, d) => sum + d.value, 0) / 3,
  }));
}, [data]);`}</code>
          </pre>
          <p>
            <strong>Why useMemo:</strong> Charts re-render frequently during
            drag operations. Processing data on every render would cause visible
            lag.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            3. Multi-Stage Data Pipeline
          </h4>
          <p>
            In TasksPage.tsx, filtering and sorting form a two-stage pipeline:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`// Stage 1: Filter
const filteredTasks = useMemo(() => {
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

// Stage 2: Sort
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
}, [filteredTasks, sortBy]);`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> With 1000+ tasks, re-filtering and
            sorting on every keystroke would freeze the UI. Each stage only
            recalculates when its specific dependencies change.
          </p>

          <p>
            <strong>Important: When NOT to use useMemo</strong>
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - premature optimization
const fullName = useMemo(
  () => firstName + ' ' + lastName,
  [firstName, lastName]
);

//  Good - just do it directly
const fullName = firstName + ' ' + lastName;`}</code>
          </pre>
          <p>
            useMemo adds overhead (memory and comparison logic). Only use it
            when the calculation is genuinely expensive or when preventing
            re-renders of child components through referential equality.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useContext
          </h3>
          <p>
            useContext allows components to access global state without prop
            drilling. It subscribes a component to a context, re-rendering it
            whenever the context value changes.
          </p>
          <p>
            <strong>Real-world use cases from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. Theme Management
          </h4>
          <p>
            In ThemeContext.tsx, the theme is accessible throughout the app:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Usage in Navigation.tsx
const { theme, toggleTheme } = useTheme();`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Over 20 components need theme
            access. Passing props through every level would be impractical and
            error-prone.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Application Settings
          </h4>
          <p>In SettingsContext.tsx, global configuration is shared:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

// Usage in DashboardPage.tsx
const { settings } = useSettings();
// Access refreshInterval for auto-refresh logic`}</code>
          </pre>
          <p>
            <strong>Why useContext:</strong> Application-wide settings like
            refresh intervals need to be consistently accessible across the
            component tree.
          </p>

          <p>
            <strong>Important considerations:</strong>
          </p>
          <ul>
            <li>
              useContext() in a component isn't affected by providers returned
              from the same component—it looks upward in the tree.
            </li>
            <li>
              Even if a component is wrapped in React.memo, it re-renders when
              context values change. This is expected behavior for context
              consumers.
            </li>
            <li>
              Avoid putting high-frequency updates in context (like mouse
              position), as all consumers re-render on every change.
            </li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useEffect
          </h3>
          <p>
            useEffect synchronizes components with external systems—API calls,
            subscriptions, timers, and DOM operations. It runs after render and
            can optionally clean up before the next effect or unmount.
          </p>
          <p>
            <strong>Real-world use cases from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. Initial Data Fetching
          </h4>
          <p>In DashboardPage.tsx, chart data is loaded on mount:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useEffect(() => {
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
}, []); // Empty deps = run once on mount`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Load initial data after component
            mounts. Empty dependency array ensures this runs only once.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Subscriptions with Cleanup
          </h4>
          <p>
            In DashboardPage.tsx, real-time updates are subscribed to with
            proper cleanup:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useEffect(() => {
  const unsubscribe = mockApi.subscribeToLiveData((newData) => {
    setLineData(prev => [...prev.slice(-11), newData]);
  });

  // Cleanup prevents memory leaks
  return () => {
    unsubscribe();
  };
}, []); // No deps = subscribe once, cleanup on unmount`}</code>
          </pre>
          <p>
            <strong>Why cleanup:</strong> Without the cleanup function,
            re-renders would create multiple subscriptions, causing memory leaks
            and duplicate updates.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            3. Interval-Based Auto-Refresh
          </h4>
          <p>In DashboardPage.tsx, configurable auto-refresh is implemented:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useEffect(() => {
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
}, [settings.refreshInterval]); // Re-run when interval changes`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> When settings change, the old
            interval is cleared and a new one is created with the updated value.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            4. Syncing Props to State
          </h4>
          <p>In TaskList.tsx, internal state syncs with filtered props:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useEffect(() => {
  setTasks(initialTasks);
}, [initialTasks]); // Update when filtered/sorted tasks change`}</code>
          </pre>
          <p>
            <strong>Why useEffect:</strong> React to external prop changes and
            update component state accordingly.
          </p>

          <p>
            <strong>Dependency array behavior:</strong>
          </p>
          <ul>
            <li>Empty array [] - runs once on mount</li>
            <li>No array - runs on mount and after every re-render</li>
            <li>With dependencies - runs when any dependency changes</li>
          </ul>

          <p>
            <strong>Cleanup execution order:</strong>
          </p>
          <p>
            When dependencies change: cleanup runs with old values → component
            re-renders → effect runs with new values. This ensures proper
            cleanup before the next effect execution.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useDeferredValue
          </h3>
          <p>
            useDeferredValue lets you defer updating a part of the UI to keep
            other updates responsive. It creates a "deferred" version of a value
            that lags behind the urgent version, allowing React to prioritize
            more important updates.
          </p>
          <p>
            <strong>Real-world use case from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            Search Input Responsiveness
          </h4>
          <p>
            In TasksPage.tsx, search input stays responsive even with expensive
            filtering:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const [searchQuery, setSearchQuery] = useState('');
const deferredSearchQuery = useDeferredValue(searchQuery);

// Filter with deferred value
const filteredTasks = useMemo(() => {
  let filtered = tasks;

  if (deferredSearchQuery) { // Uses deferred, not immediate value
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(deferredSearchQuery.toLowerCase())
    );
  }

  return filtered;
}, [tasks, deferredSearchQuery]);

// Show pending indicator
const isFiltering = searchQuery !== deferredSearchQuery;`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> With 1000+ tasks, filtering on
            every keystroke would make typing feel laggy. useDeferredValue keeps
            the input responsive by allowing React to update it immediately
            while deferring the expensive filtering operation.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            Visual Feedback
          </h4>
          <p>Show users when deferred updates are pending:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`{isFiltering && (
  <div className="text-sm text-blue-600 flex items-center gap-2">
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">...</svg>
    Filtering tasks...
  </div>
)}`}</code>
          </pre>
          <p>
            <strong>User experience:</strong> Input updates instantly, results
            update slightly delayed. Users can continue typing without
            interruption while the expensive filtering happens in the
            background.
          </p>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>Search/filter operations on large datasets</li>
            <li>Input fields that trigger expensive renders</li>
            <li>Keeping critical UI responsive during heavy updates</li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useLayoutEffect
          </h3>
          <p>
            useLayoutEffect is identical to useEffect but fires synchronously
            before the browser paints the screen. This prevents visual flicker
            when you need to measure or mutate the DOM before users see it.
          </p>
          <p>
            <strong>Real-world use cases from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. Theme Class Application
          </h4>
          <p>
            In ThemeContext.tsx, theme changes happen before paint to prevent
            flicker:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useLayoutEffect(() => {
  const root = document.documentElement;

  // Remove existing theme classes
  root.classList.remove('light', 'dark');

  // Add new theme class BEFORE browser paints
  root.classList.add(theme);

  // Persist to localStorage
  localStorage.setItem('theme', theme);
}, [theme]);`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Prevents "flash of wrong theme" on
            load. If we used useEffect instead, users would see a brief flash of
            the wrong theme before the correct one applies.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Drag Position Synchronization
          </h4>
          <p>
            In useDragAndDrop.ts, cursor and listeners update immediately during
            drag:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useLayoutEffect(() => {
  if (dragState.isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Change cursor synchronously
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }
}, [dragState.isDragging, handleMouseMove, handleMouseUp]);`}</code>
          </pre>
          <p>
            <strong>Why useLayoutEffect:</strong> Drag operations feel sluggish
            with useEffect's async timing. Synchronous updates make dragging
            feel native and responsive.
          </p>

          <p>
            <strong>Timing comparison:</strong>
          </p>
          <ul>
            <li>useEffect: React renders → Browser paints → useEffect runs</li>
            <li>
              useLayoutEffect: React renders → useLayoutEffect runs → Browser
              paints
            </li>
          </ul>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>Preventing visual flicker (theme changes, animations)</li>
            <li>Measuring DOM elements before paint</li>
            <li>Synchronous DOM mutations</li>
          </ul>

          <p>
            <strong>Warning:</strong> useLayoutEffect blocks visual updates. Use
            sparingly—prefer useEffect unless you need synchronous DOM access.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useInsertionEffect
          </h3>
          <p>
            useInsertionEffect is a specialized hook for CSS-in-JS libraries. It
            fires before any DOM mutations, even before useLayoutEffect, making
            it perfect for injecting style tags that need to be present before
            any layout calculations.
          </p>
          <p>
            <strong>Real-world use case from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            Dynamic Theme Variables Injection
          </h4>
          <p>
            In ThemeContext.tsx, CSS variables are injected before any other
            effects:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useInsertionEffect(() => {
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
}, [theme]);`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> CSS variables must be available
            before any component reads computed styles. useInsertionEffect
            ensures the earliest possible injection.
          </p>

          <p>
            <strong>Execution order:</strong>
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`useInsertionEffect → useLayoutEffect → Browser Paint → useEffect`}</code>
          </pre>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>CSS-in-JS library development</li>
            <li>Dynamic style injection that affects layout</li>
            <li>Inserting global styles before component renders</li>
          </ul>

          <p>
            <strong>Warning:</strong> This is a specialized hook for library
            authors. Most applications should use useEffect or useLayoutEffect
            instead. Only use useInsertionEffect when you're building a
            CSS-in-JS library or need to inject styles before any layout
            calculations.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useRef
          </h3>
          <p>
            useRef creates a mutable reference that persists across re-renders
            without triggering updates when changed. It has two main uses:
            accessing DOM elements and storing mutable values.
          </p>
          <p>
            <strong>Real-world use cases from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. DOM Element Reference
          </h4>
          <p>
            In useDragAndDrop.ts, useRef accesses the DOM node for drag
            calculations:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const elementRef = useRef<HTMLDivElement>(null);
const initialPosRef = useRef<Position>(initialPosition);

// Later used to access the DOM element
const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  if (elementRef.current) {
    const rect = elementRef.current.getBoundingClientRect();
    // Use rect for calculations
  }
};`}</code>
          </pre>
          <p>
            <strong>Why useRef:</strong> Accessing .current doesn't trigger
            re-renders, making it perfect for values that don't affect the
            visual output.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Storing Widget References
          </h4>
          <p>
            In WidgetContainer.tsx, useRef stores a Map of child component
            handles:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const widgetRefs = useRef<Map<string, WidgetHandle>>(new Map());

// Later used to call imperative methods
widgetRefs.current.forEach((widget, id) => {
  widget.refresh(); // Call method on child component
});`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Parent needs to control child
            widgets imperatively. Storing the Map in state would cause
            unnecessary re-renders on every update.
          </p>

          <p>
            <strong>useRef vs useState:</strong>
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - causes re-render on every timer tick
const [intervalId, setIntervalId] = useState<number | null>(null);

//  Good - no re-render needed
const intervalIdRef = useRef<number | null>(null);`}</code>
          </pre>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>Accessing DOM elements (refs)</li>
            <li>
              Storing mutable values that don't affect render (timers, previous
              values)
            </li>
            <li>Keeping references to objects across renders</li>
          </ul>

          <p>
            <strong>Key principle:</strong> If changing the value should trigger
            a re-render, use useState. If not, use useRef.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useImperativeHandle
          </h3>
          <p>
            useImperativeHandle customizes the ref value exposed to parent
            components when using forwardRef. Instead of exposing the entire DOM
            element, you can expose only specific methods.
          </p>
          <p>
            <strong>Real-world use case from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            Widget Control Interface
          </h4>
          <p>
            In DraggableWidget.tsx, a custom API is exposed to parent
            components:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`export interface WidgetHandle {
  refresh: () => void;
  resetPosition: () => void;
  getPosition: () => { x: number; y: number };
}

export const DraggableWidget = forwardRef<WidgetHandle, DraggableWidgetProps>(
  ({ children, title, initialPosition }, ref) => {
    const [refreshKey, setRefreshKey] = useState(0);
    const { position, reset } = useDragAndDrop(initialPosition);

    // Expose custom API to parent
    useImperativeHandle(
      ref,
      () => ({
        refresh: () => {
          console.log(\`Refreshing widget: \${title}\`);
          setRefreshKey(prev => prev + 1); // Force re-render
        },
        resetPosition: () => {
          reset(); // Call custom hook's reset
        },
        getPosition: () => position,
      }),
      [title, position, reset]
    );

    return <div>...</div>;
  }
);`}</code>
          </pre>

          <p>Parent component usage (WidgetContainer.tsx):</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const widgetRefs = useRef<Map<string, WidgetHandle>>(new Map());

const refreshAllWidgets = useCallback(() => {
  widgetRefs.current.forEach((widget, id) => {
    widget.refresh(); // Call child's custom method
  });
}, []);

// Attach refs to children
<DraggableWidget
  ref={(el) => {
    if (el) widgetRefs.current.set(widget.id, el);
  }}
/>`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Parent needs to control multiple
            child widgets imperatively without exposing internal implementation
            details. The alternative (lifting state up) would be complex and
            cause unnecessary re-renders.
          </p>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>Creating reusable component libraries</li>
            <li>Exposing imperative APIs (focus, play, pause)</li>
            <li>Hiding implementation details while allowing parent control</li>
          </ul>

          <p>
            <strong>When NOT to use:</strong> Prefer declarative patterns (props
            and state) when possible. Use useImperativeHandle only when
            imperative control is genuinely needed.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useId
          </h3>
          <p>
            useId generates unique, stable IDs that work correctly with
            server-side rendering (SSR). It ensures accessibility by properly
            associating form labels, inputs, and ARIA attributes.
          </p>
          <p>
            <strong>Real-world use case from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            Accessible Form Fields
          </h4>
          <p>
            In AddTaskForm.tsx, useId creates stable IDs for form accessibility:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const titleId = useId();
const priorityId = useId();
const formId = useId();

const errorId = \`\${formId}-error\`;
const helpId = \`\${formId}-help\`;`}</code>
          </pre>

          <p>Usage in JSX:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`<form id={formId} aria-describedby={error ? errorId : helpId}>
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
</form>`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Form fields are properly associated
            with labels for screen readers. IDs are unique across the app with
            no collisions, and they remain stable across server/client renders.
          </p>

          <p>
            <strong>Why useId is better than alternatives:</strong>
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - changes on every render!
const id = Math.random().toString();

//  Bad - collisions with multiple forms
const id = 'title-input';

//  Good - stable and unique
const id = useId();`}</code>
          </pre>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>Form label/input associations</li>
            <li>ARIA attributes (aria-describedby, aria-labelledby)</li>
            <li>Any case requiring unique IDs across component instances</li>
          </ul>

          <p>
            <strong>SSR compatibility:</strong> useId generates matching IDs on
            server and client, preventing hydration mismatches that would occur
            with random IDs.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useTransition
          </h3>
          <p>
            useTransition marks state updates as non-urgent transitions,
            allowing React to interrupt them for more important updates. This
            keeps the UI responsive during expensive operations by letting React
            prioritize urgent updates like user input.
          </p>
          <p>
            <strong>Real-world use cases from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            1. Task Toggle Operations
          </h4>
          <p>In TaskList.tsx, task updates don't block the UI:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const [isPending, startTransition] = useTransition();

const handleToggle = async (id: string) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  // Optimistic update happens immediately
  addOptimisticUpdate({ type: 'toggle', id });

  try {
    const updated = await mockApi.updateTask(id, { completed: !task.completed });

    // Wrap state update in transition
    startTransition(() => {
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    });
  } catch (error) {
    console.error('Failed to toggle task:', error);
  }
};`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> UI stays responsive during async
            task updates. React marks the setState as "low priority" and can
            interrupt it if the user interacts with the page.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            2. Task Creation with Form Reset
          </h4>
          <p>
            In AddTaskForm.tsx, form resets don't block subsequent interactions:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Do async work first
    const newTask = await mockApi.addTask(title.trim(), priority);

    // Then wrap only state updates in transition
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
};`}</code>
          </pre>
          <p>
            <strong>Why useTransition:</strong> If the user immediately starts
            typing in the form again, React can prioritize that input over the
            form reset, preventing input lag.
          </p>

          <p>
            <strong>Key differences from useDeferredValue:</strong>
          </p>
          <ul>
            <li>
              useTransition - You control which state updates are transitions
              (wrap setState calls)
            </li>
            <li>
              useDeferredValue - React defers the value automatically (no
              control over setState)
            </li>
          </ul>

          <p>
            <strong>isPending indicator:</strong>
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`{isPending && <Spinner />}`}</code>
          </pre>
          <p>
            Use the isPending flag to show loading indicators during
            transitions.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useOptimistic
          </h3>
          <p>
            useOptimistic enables instant UI updates before server confirmation.
            It automatically rolls back changes if the operation fails,
            providing native app-like responsiveness without manual undo logic.
          </p>
          <p>
            <strong>Real-world use case from TeamPulse:</strong>
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            Task List Operations
          </h4>
          <p>
            In TaskList.tsx, tasks update instantly with automatic rollback:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`const [optimisticTasks, addOptimisticUpdate] = useOptimistic<Task[], OptimisticAction>(
  tasks,
  (state, action) => {
    switch (action.type) {
      case 'toggle':
        // Show toggled immediately
        return state.map(task =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        );

      case 'delete':
        // Remove from list immediately
        return state.filter(task => task.id !== action.id);

      default:
        return state;
    }
  }
);

// Usage
const handleToggle = async (id: string) => {
  // UI updates INSTANTLY
  addOptimisticUpdate({ type: 'toggle', id });

  try {
    await mockApi.updateTask(id, { completed: !task.completed });
    // Success: state syncs
  } catch (error) {
    // Error: AUTOMATICALLY rolls back to previous state
    alert('Failed to update task');
  }
};`}</code>
          </pre>
          <p>
            <strong>Problem solved:</strong> Users see instant feedback before
            the server responds (typically 300-500ms). If the operation fails,
            the UI automatically reverts without manual undo logic.
          </p>

          <h4 className='text-base dark:text-neutral-200 font-serif mt-4'>
            Visual Pending State
          </h4>
          <p>Show which updates are pending confirmation:</p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`{optimisticTasks.map(task => {
  const actualTask = tasks.find(t => t.id === task.id);
  const isPendingTask = !actualTask || actualTask.completed !== task.completed;

  return (
    <TaskItem
      key={task.id}
      task={task}
      isPending={isPendingTask} // Show visual feedback
    />
  );
})}`}</code>
          </pre>
          <p>
            <strong>User experience comparison:</strong>
          </p>
          <ul>
            <li>
              Without useOptimistic: 300-500ms delay before checkbox updates
            </li>
            <li>
              With useOptimistic: Checkbox updates immediately, feels like a
              native app
            </li>
          </ul>

          <p>
            <strong>When to use:</strong>
          </p>
          <ul>
            <li>Form submissions that update the UI</li>
            <li>Toggle operations (likes, checkboxes, favorites)</li>
            <li>Delete operations with optimistic removal</li>
            <li>Any operation where instant feedback improves UX</li>
          </ul>

          <p>
            <strong>Why it's better than manual optimistic updates:</strong>{' '}
            Automatic rollback on failure is safer and requires less code than
            manually tracking and undoing optimistic changes.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Precautions: When NOT to Use Hooks
          </h2>
          <p>
            While hooks are powerful, they're often misused. Here are common
            mistakes and when to avoid using certain hooks, illustrated with
            examples from real-world scenarios.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            1. Overusing useMemo and useCallback
          </h3>
          <p>
            The most common mistake is premature optimization. These hooks add
            overhead—don't use them unless there's a measurable benefit.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - premature optimization
const name = useMemo(() => firstName + ' ' + lastName, [firstName, lastName]);
const handleClick = useCallback(() => setCount(count + 1), [count]);

//  Good - just do it directly
const name = firstName + ' ' + lastName;
const handleClick = () => setCount(count + 1);`}</code>
          </pre>
          <p>
            <strong>When to actually use:</strong>
          </p>
          <ul>
            <li>
              useMemo: Expensive calculations (filtering 1000+ items, complex
              mathematical operations)
            </li>
            <li>
              useCallback: Passing to memoized child components or as effect
              dependencies
            </li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            2. Using Context for High-Frequency Updates
          </h3>
          <p>
            Context causes all consumers to re-render when any value changes.
            Avoid it for rapidly changing values.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - every consumer re-renders on every mouse move!
const MouseContext = createContext({ x: 0, y: 0 });

function MouseProvider({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <MouseContext.Provider value={pos}>{children}</MouseContext.Provider>;
}

//  Good - use local state or a proper state management library
function Component() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // Handle locally or use zustand/redux for fine-grained updates
}`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            3. Storing Non-Reactive Values in State
          </h3>
          <p>
            If a value doesn't affect rendering, don't store it in state—use
            useRef instead.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - causes unnecessary re-renders
const [timerId, setTimerId] = useState<number | null>(null);

useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000);
  setTimerId(id); // Triggers re-render for no reason
  return () => clearInterval(timerId);
}, []);

//  Good - ref doesn't trigger re-renders
const timerIdRef = useRef<number | null>(null);

useEffect(() => {
  timerIdRef.current = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(timerIdRef.current);
}, []);`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            4. Side Effects in Render
          </h3>
          <p>
            Never perform side effects directly in the component body—always use
            useEffect.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`function Component() {
  //  Bad - modifying DOM during render
  document.title = 'My App';

  //  Bad - calling API during render
  fetch('/api/data').then(setData);

  return <div>...</div>;
}

function Component() {
  //  Good - side effects in useEffect
  useEffect(() => {
    document.title = 'My App';
  }, []);

  useEffect(() => {
    fetch('/api/data').then(setData);
  }, []);

  return <div>...</div>;
}`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            5. Excessive useEffect Dependencies
          </h3>
          <p>
            Adding too many dependencies can cause infinite loops or excessive
            re-runs.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - infinite loop
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1); // count changes → effect runs → count changes → ...
}, [count]);

//  Good - use functional update
useEffect(() => {
  setCount(c => c + 1); // No dependency needed
}, []);`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            6. Forgetting useEffect Cleanup
          </h3>
          <p>
            Always clean up subscriptions, timers, and event listeners to
            prevent memory leaks.
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto'>
            <code>{`//  Bad - memory leak
useEffect(() => {
  const interval = setInterval(() => console.log('tick'), 1000);
  // Missing cleanup!
}, []);

//  Good - proper cleanup
useEffect(() => {
  const interval = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(interval);
}, []);`}</code>
          </pre>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            Summary: The Golden Rule
          </h3>
          <p>
            <strong>
              Use hooks to solve specific problems, not because they exist.
            </strong>{' '}
            Each hook in TeamPulse Dashboard addresses a genuine need:
          </p>
          <ul>
            <li>useState when values affect rendering</li>
            <li>useEffect for side effects and synchronization</li>
            <li>useRef for non-reactive values and DOM access</li>
            <li>useMemo/useCallback only when performance matters</li>
            <li>
              useContext for truly global state (not high-frequency updates)
            </li>
            <li>
              Advanced hooks (useOptimistic, useTransition) for specific UX
              improvements
            </li>
          </ul>
          <p>
            The key is knowing when NOT to use them. Premature optimization and
            unnecessary complexity make code harder to maintain without
            providing meaningful benefits. Start simple, measure performance,
            and optimize only when needed.
          </p>
        </div>
      </div>
    </section>
  );
}
