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
            <li>Diving in (for real)</li>
            <li>When it is best to avoid using them</li>
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
              definitions unless as long as none their dependencies change
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
            <li>useDefferedValue</li>
            <li>useTransition</li>
            <li>useOptimistic</li>
            <li>useId</li>
            <li>useInsertionEffect</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Diving in (for real)
          </h2>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useCallback
          </h3>
          <p>
            Ironically the official React docs suggest avoiding situations where
            the hook has to be implemented. We use it when we want to prevent a
            function from being recreated, often to avoid triggering child
            re-renders.
          </p>
          <p>Suggested to be used in two situations:</p>
          <ul>
            <li>
              When the function is passed as a prop to a child component and we
              want to skip re-rendering the child component when the function
              does not change
            </li>
            <li>
              When the function is passed as a dependency to a useEffect or
              another useCallback
            </li>
          </ul>
          <p>
            <strong>NOTE:</strong>
          </p>
          <ul>
            <li>
              We can use an updater function to avoid passing a state in the
              dependency array of a useCallback, because the updater function
              would already use the latest value of the state.
            </li>
            <li>
              We cannot put a useCallback inside a hook because that violates a
              rule of hooks, that is, a useCallback should be at the top of the
              component. Two alternatives to this would be - making another
              component with that part of the code which includes usage of the
              hook or wrapping the child component in a React.memo.
            </li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useMemo
          </h3>
          <p>
            We use it when we want to cache an expensive calculation between
            re-renders. The usage format will be same as useCallback.
          </p>
          <p>
            Any function that returns something performs a calculation, so wrap
            it in a useMemo.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useContext
          </h3>
          <p>
            It is used to use an already created context in a component. Now,
            the context could have a lot of things like states (and their setter
            functions), functions, and variables. In order to pass these values
            from the context to the intended component, the latter needs to be
            wrapped in a context-provider.
          </p>
          <p>A few points to note:</p>
          <ul>
            <li>
              useContext() call in a component is not affected by providers
              returned from the same component.
            </li>
            <li>
              Even if none of a component props changes and it is wrapped in
              memo, on change of the value accessed through useContext, the
              component gets re-rendered
            </li>
          </ul>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useEffect
          </h3>
          <p>useEffect runs in the following manner:</p>
          <ul>
            <li>
              dependencies is an empty array, in this case, useEffect runs on
              mount
            </li>
            <li>
              dependencies is null or no dependency array is passed, in this
              case, it runs on mount and every re-render afterwards
            </li>
            <li>
              dependencies has length greater than 0, runs whenever the
              dependency changes
            </li>
          </ul>
          <p>
            The callback returns a cleanup function which runs on re-render,
            this is how it goes:
          </p>
          <p>
            If we have passed certain dependencies to the effect and they
            change, that leads to the component being re-rendered, when that
            happens, the cleanup runs with the old value of the dependencies and
            then the effect runs with the new values.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useDefferedValue
          </h3>
          <p>
            In simple terms, this hook is used to tell React that a certain part
            of a component could have less precedence than other components on
            the page. So while the browser is busy updating the DOM for the rest
            of the page, this part could still work with its older value.
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useLayoutEffect
          </h3>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useInsertionEffect
          </h3>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useRef
          </h3>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useImperativeHandle
          </h3>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useId
          </h3>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h3 className='text-lg dark:text-neutral-200 font-serif mt-6'>
            useTransition
          </h3>
          <p>
            <em>Content coming soon...</em>
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif mt-8'>
            Precautions, for when it is best to avoid using them
          </h2>
          <p>
            <em>Content coming soon...</em>
          </p>
        </div>
      </div>
    </section>
  );
}
