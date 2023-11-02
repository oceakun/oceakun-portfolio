import type { Metadata } from 'next';
import {
  StackIcon
} from '../../components/icons';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Interned at 2 places, currently at third',
};

export default function ExperincePage() {
  return (
    <section>
      <h1 className="font-bold text-3xl dark:text-neutral-200 font-serif">
        Experience
      </h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200 mt-10">
        <div>
          <span className="grid grid-cols-[auto_1fr_auto] items-center mt-4 max-w-[650px]">
            <mark className="bg-transparent dark:text-yellow-200 text-rose-500 ">
              IIT Delhi
            </mark>
            <span className="h-[0.1em] bg-neutral-400 dark:bg-neutral-700 mx-2" />
            <mark className="bg-transparent dark:text-neutral-400 italic">
              June 1st, 2023 - Present
            </mark>
          </span>

          <span className="flex flex-row justify-between">
            <mark className="bg-transparent dark:text-neutral-400 italic">
              Project Intern
            </mark>
            <mark className="bg-transparent dark:text-neutral-500 italic">
              Remote
            </mark>
          </span>

          <p>
            Building web app for an AI powered tool {"["}with React.js, FastAPI,
            MySQL and Docker{"] "}
            and developing components for a data visualization platform {"["}
            with React.js and third party libraries{"]"}.
          </p>

          <span className="flex flex-row mb-14">
            <StackIcon />
            <span className="italic text-sm dark:text-neutral-400">
              {" "}
              &nbsp; React.js, FastAPI, MySQL, Docker
            </span>
          </span>
        </div>

        <div className="mt-12">
          <span className="grid grid-cols-[auto_1fr_auto] items-center mt-4 max-w-[650px]">
            <mark className="bg-transparent dark:text-yellow-200 text-rose-500">
              Devkit
            </mark>
            <span className="h-[0.1em] bg-neutral-400  dark:bg-neutral-700 mx-2" />
            <mark className="bg-transparent dark:text-neutral-400 italic">
              Jan 3rd, 2023 - March 4th, 2023
            </mark>
          </span>
          <span className="flex flex-row justify-between">
            <mark className="bg-transparent dark:text-neutral-400 italic">
              Frontend heavy, Full-stack Development Intern
            </mark>
            <mark className="bg-transparent dark:text-neutral-500 italic">
              Remote
            </mark>
          </span>

          <p>
            Built online developer tools for p5.js and Tailwind CSS libraries
            {"["}with Next.js, Typescript and Tailwind CSS{"]"}.
          </p>

          <span className="flex flex-row mb-14">
            <StackIcon />
            <span className="italic text-sm dark:text-neutral-400">
              {" "}
              &nbsp; Next.js, Typescript, TailwindCSS
            </span>
          </span>
        </div>

        <div className="mt-12">
          <span className="grid grid-cols-[auto_1fr_auto] items-center mt-4 max-w-[650px]">
            <mark className="bg-transparent dark:text-yellow-200 text-rose-500">
              Radiowalla
            </mark>
            <span className="h-[0.1em] bg-neutral-400 dark:bg-neutral-700 mx-2" />
            <mark className="bg-transparent dark:text-neutral-400 italic">
              May 28th, 2022 - July 14th, 2022
            </mark>
          </span>

          <span className="flex flex-row justify-between">
            <mark className="bg-transparent dark:text-neutral-400 italic">
              Frontend Development Intern
            </mark>
            <mark className="bg-transparent dark:text-neutral-500 italic">
              Remote
            </mark>
          </span>

          <p>
            Built a complete dashboard for data visualization from scratch {"["}
            with React.js and Highcharts library{"]"} and integrated third party
            and in-house APIs, token based authentication(JWT) and 'Role Based
            Access Control' system
          </p>

          <span className="flex flex-row mb-10">
            <StackIcon />
            <span className="italic text-sm dark:text-neutral-400">
              {" "}
              &nbsp; React.js, Highcharts, JWT
            </span>
          </span>
        </div>

        {/* <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
            <div className="py-1 tracking-tighter">
                <span>2023-03-07</span>
            </div>
            <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
            <span>23 views</span>
      </div> */}
      </div>
    </section>
  );
}