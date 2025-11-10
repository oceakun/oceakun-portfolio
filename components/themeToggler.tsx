'use client';
import { DarkModeIcon, LightModeIcon } from './icons';

const ToggleSwitch = () => {
  const handleThemeToggle = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    localStorage.setItem('theme', JSON.stringify(newTheme));

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className='md:ml-2 hover:cursor-pointer' onClick={handleThemeToggle}>
      <span className='dark:hidden'>
        <LightModeIcon />
      </span>
      <span className='hidden dark:inline'>
        <DarkModeIcon />
      </span>
    </div>
  );
};

export default ToggleSwitch;
