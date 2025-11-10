'use client';
import { useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import dynamic from 'next/dynamic';
import { DarkModeIcon, LightModeIcon } from './icons';

const ToggleSwitch = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (
      JSON.parse(window.localStorage.getItem('theme') || '{}') === 'dark' ||
      (!('theme' in window.localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      window.document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      window.document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const handleThemeToggle = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <div
      className='md:ml-2 hover:cursor-pointer'
      onClick={() => handleThemeToggle()}
    >
      {theme == 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ToggleSwitch), {
  ssr: false,
});
