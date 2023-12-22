import React from "react";
import { LeftArrowIcon } from "../../../components/icons";
import Link from "next/link";
import Image from "next/image";
import tailwindConfigJs from "../../../public/tailwind-config-js.png";
import themeSwitcher from "../../../public/theme-switcher.png";
import darkMode from "../../../public/dark-mode.png";
import lightMode from "../../../public/light-mode.png";

export default function BlogPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl dark:text-neutral-200 font-serif text-center md:text-left">
        Grafana as a local service and beyond{" "}
      </h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify">
        <div className="text-justify">
          <p className="w-full flex flex-row justify-between items-end">
            <span className="font-[300] text-[14px] dark:text-yellow-200 text-rose-500">
              ----------
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
          <p className="text-center bg-gradient-to-r from-rose-500 to-pink-900 dark:from-white dark:to-yellow-900 inline-block text-transparent bg-clip-text flex flex-row justify-center items-center font-['']">
            Coming soon..
          </p>
        </div>
      </div>
    </section>
  );
}