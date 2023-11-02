'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import ToggleSwitch from "./themeToggler";

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/projects": {
    name: "projects",
  },
  "/experience": {
    name: "experience",
  },
  "/blog": {
    name: "blog",
  },
};

export default function Navbar(){
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="md:w-[200px] md:flex-shrink-0 md:mx-0 md:px-0 md:top-0 font-serif md:relative md:justify-start backdrop-blur-md flex flex-col fixed justify-end w-full bottom-0 py-2 md:py-0">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="flex flex-row justify-center w-full gap-10 items-center ml-[18px] md:flex-col md:items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            {/* <div className="md:ml-2 hover:cursor-pointer" onClick={()=>handleThemeToggle()}>
              {
              theme=='light'?<LightModeIcon />:<DarkModeIcon />
              }
            </div> */}
            <div className="hidden md:block">
              <ToggleSwitch />
            </div>
            <div className="flex flex-row justify-center w-full gap-[6px] md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 dark:text-neutral-400 flex align-middle",
                      {
                        "text-neutral-500": !isActive,
                        "font-bold": isActive,
                      }
                    )}
                  >
                    <span className="relative py-[5px] px-[10px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 bg-neutral-300 md:bg-neutral-100 dark:bg-neutral-700 dark:md:bg-neutral-800 rounded-md z-[-1] text-white-400"
                          layoutId="sidebar"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}


