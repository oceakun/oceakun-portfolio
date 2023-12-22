import React from "react";
import { LeftArrowIcon } from "../../../components/icons";
import Link from "next/link";
import Image from "next/image";
import tailwindConfigJs from "../../../public/tailwind-config-js.png";
import themeSwitcher from "../../../public/theme-switcher.png";
import darkMode from "../../../public/dark-mode.png";
import lightMode from "../../../public/light-mode.png";
// import CodeBlock from "@/components/codeBlock";

export default function BlogPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl dark:text-neutral-200 font-serif text-center md:text-left">
        Persistent and flickerless 'Dark theme'
      </h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify">
        <div className="text-justify">
          <p className="w-full flex flex-row justify-between items-end">
            <span className="font-[300] text-[14px] dark:text-yellow-200 text-rose-500">
              <span className="font-[300] text-[12px] dark:text-yellow-200 text-rose-500 italic">
               (Last Updated on)
              </span>
              {" "}22-12-2023
            </span>
            <Link
              href="/blog"
              className="dark:text-yellow-200 text-rose-500 hover:cursor-pointer no-underline font-[300]"
            >
              {/* <LeftArrowIcon /> */}
              <span>Back</span>
            </Link>
          </p>
          <br />
          {/* <br /> */}
          <div className="flex flex-col justify-center items-center gap-4 mb-6 ">
            <Image src={darkMode} alt="dark-mode-image" />
            {/* <CodeBlock/> */}
          </div>
          <div className="flex flex-col justify-center items-center gap-4 mb-6">
            <Image src={lightMode} alt="light-mode-image" />
          </div>
          <span className="text-justify mt-6">
            'Dark mode' has a number of merits to it's name, such as, reduced
            eye strain, improved readability, reduced glare and customizability,
            among others.
            <br />
            <br />
            Here's a brief guide for implementing the same either with{" "}
            <mark className="bg-transparent italic dark:text-neutral-300">
              ReactJS & Styled Components
            </mark>{" "}
            or{" "}
            <mark className="bg-transparent italic dark:text-neutral-300">
              NextJS , TailwindCSS & next-themes
            </mark>
            .
            <br />
            <br />
            <h1 className="text-xl dark:text-neutral-200 font-serif">
              Persistance
            </h1>
            While using a site with the dark/light theme feature, you might have
            have noticed that the selected theme persists across reloads and
            page navigation.
            <br />
            <br />
            <h1 className="text-xl dark:text-neutral-200 font-serif">
              Flicker-less behaviour
            </h1>
            Also, during reloads and page navigation, there's no
            flash-of-unstyled-content (FOUC), which at it's core, is about the
            page appearing in its unstyled, or default theme before the selected
            theme(dark theme) takes effect.
            <br />
            <br />
            This guide already accounts for and takes care of the above
            mentioned phenomenan, though, I'll be sure to mention the
            responsible parts.
            <br />
            <br />
            <h1 className="text-xl font-serif">
              Dark-theme with{" "}
              <mark className="bg-transparent italic dark:text-neutral-200">
                NextJS , TailwindCSS & 'next-themes'
              </mark>
            </h1>
            In order to follow along, have the following versions of the
            packages installed
            <br />
            <ul>
              <li>next (13.4.9)</li>
              <li>next-themes (0.2.1)</li>
              <li>tailwindcss (3.3.2)</li>
            </ul>
            Then,
            <ol type="a">
              {" "}
              <li>
                {" "}
                add "darkMode: "class"" to the module.exports object in{" "}
                <mark className="bg-transparent italic dark:text-neutral-300">
                  tailwind.config.js.
                </mark>{" "}
              </li>{" "}
              <li>
                create a component 'ThemeSwitcher' like the one below
                <div className="flex flex-row justify-center w-full my-4">
                  <Image src={themeSwitcher} alt="themeSwitcher.js" />
                </div>
                Here's how the component works,
                <br />
                <ul>
                  <li>
                    imports the useTheme hook from the next-themes package
                  </li>
                  <li>
                    initializes a state variable 'mounted' using the useState
                    hook, which is initially set to false. This state variable
                    is used to track whether the component has finished
                    mounting, in order to prevent potential "flash of unstyled
                    content" (FOUC) by initially rendering nothing (returning
                    null) and then rendering the component once it's mounted
                    (mounted === true).
                  </li>
                  <li>
                    uses the useTheme hook to access the current theme and a
                    function to set the theme. The "dark" argument specifies the
                    initial theme when the component loads. This hook
                    essentially connects your component to the theme management
                    system provided by next-themes.
                  </li>
                  <li>
                    the function, handleThemeToggle, sets the theme to the
                    specified newTheme when called.
                  </li>
                  <li>
                    if mounted is false, null is returned, effectively
                    preventing the component from rendering until it's fully
                    mounted.
                  </li>
                  <li>
                    renders the UI for the theme switcher, including the theme
                    icon (light or dark) and the handleThemeToggle function to
                    toggle the theme when the user clicks on the icon.
                  </li>
                </ul>
              </li>
              <li>
                wrap the app's layout with the ThemeProvider, imported from
                next-themes and pass it the following three props
                <ul>
                  <li>attribute="class"</li>
                  <li> defaultTheme="system"</li>
                  <li> enableSystem</li>
                </ul>
              </li>
            </ol>
            That's it.
            <br />
            <br />
            {/* <h1 className="text-xl font-serif">
              Dark-theme with{" "}
              <mark className="bg-transparent italic dark:text-neutral-200">
                ReactJS & Styled Components
              </mark>
            </h1> */}
            {/* <br /> */}
            {/* <br /> */}
            <h1 className="text-xl font-serif">References</h1>
            <ul>
              <li>
                <Link
                  className="font-[200]"
                  href="https://egghead.io/blog/tailwindcss-dark-mode-nextjs-typography-prose"
                >
                  TailwindCSS Dark Mode in Next.js with Tailwind Typography
                  Prose Classes
                </Link>
              </li>
              <li>
                <Link
                  className="font-[200]"
                  href="https://blog.logrocket.com/dark-mode-react-in-depth-guide/"
                >
                  Dark mode in React: An in-depth guide
                </Link>
              </li>
            </ul>
          </span>
          {/* <p className="text-center bg-gradient-to-r from-rose-500 to-pink-900 dark:from-white dark:to-yellow-900 inline-block text-transparent bg-clip-text flex flex-row justify-center items-center ">
            Coming soon..
          </p> */}
        </div>
      </div>
    </section>
  );
}
