import type { Metadata } from 'next';
import {
  GitHubIcon,
  LinkIcon,
  StackIcon,
  HashIcon
} from '../../components/icons';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Code and deployment links for the projects',
};

export default function ProjectPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl dark:text-neutral-200 font-serif">
        Projects
      </h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200 ">
        <fieldset>
          <legend>
            <p className="dark:text-yellow-200 text-rose-500">csv-visualizer</p>
            <span>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/oceakun/csv-visualizer"
              >
                <GitHubIcon />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/oceakun"
              >
                <LinkIcon />
              </a>
            </span>
          </legend>

          <span className="flex flex-row items-start mb-2 w-full">
            <StackIcon />
            <span className="italic text-sm dark:text-neutral-400 ">
              {" "}
              &nbsp; Astro, React-components, Js, Grafana, Go, Firebase Auth,
              Firestore, Docker
            </span>
          </span>

          <span className="flex flex-row mb-5">
            <HashIcon />
            <span className="italic text-sm dark:text-neutral-400 ">
              {" "}
              &nbsp; full stack, visualization, authentication, API,
              containerization
            </span>
          </span>

          <span>
            visualize csv-exports through grafana panels, in the form of highly
            interactive tables and charts
          </span>

          <ul className="mb-8">
            <li>
              The app provides a beautiful and intuitive interface, wherein, the
              user can upload a csv file and view visualizations in the form of
              tables and plots. The user can also create an account and save the
              generated visualizations to their profile, which can be viewed
              later on and shared with anyone else throuhg url sharing
            </li>

            <li>
              The app boasts features such as responsive design, user
              authentication, and a loosely coupled architecture
            </li>
          </ul>
        </fieldset>

        <fieldset>
          <legend>
            <p className="dark:text-yellow-200 text-rose-500">stickz</p>
            <span>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/oceakun/stickz-frontend"
              >
                <GitHubIcon />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://stickz.vercel.app/home"
              >
                <LinkIcon />
              </a>
            </span>
          </legend>

          <span className="flex flex-row mb-2">
            <StackIcon />
            <span className="italic text-sm dark:text-neutral-400">
              {" "}
              &nbsp; Typescript-React, Context API, Styled Components{" "}
            </span>
          </span>

          <span className="flex flex-row mb-5">
            <HashIcon />
            <span className="italic text-sm dark:text-neutral-400">
              {" "}
              &nbsp; ui,responsive, state management{" "}
            </span>
          </span>

          <span>
            an online solution for note-taking. It allows users to take down
            textual notes and embed images as well.
          </span>

          <ul className="mb-8">
            <li>
              The application leverages local storage to store data pertaining
              to each session, if its a one-time user, but in case of an
              authenticated user, file's content can be saved to database.
            </li>

            <li>
              Data can be stored and organized in the form of files and folders.
              The created files can be searched through, downloaded, shared and
              deleted. In addition, it avails a responsive interface,
              mutliple-themes and configurations panels for manipulating editor
              settings.
            </li>
          </ul>
        </fieldset>

        <fieldset>
          <legend>
            <p className="dark:text-yellow-200 text-rose-500">state-map</p>
            <span>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/oceakun/state-map-d3"
              >
                <GitHubIcon />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://d3-exercise.vercel.app/"
              >
                <LinkIcon />
              </a>
            </span>
          </legend>

          <span className="flex flex-row mb-2">
            <StackIcon />
            <span className="italic text-sm dark:text-neutral-400">
              {" "}
              &nbsp; Js, d3, HTMl, CSS
            </span>
          </span>

          <span className="flex flex-row mb-5">
            <HashIcon />
            <span className="italic text-sm dark:text-neutral-400">
              {" "}
              &nbsp; visualization, responsive
            </span>
          </span>

          <span>
            a map of the Indian state 'Haryana', for the categorical
            visualizations of consitutency elections.
          </span>

          <ul className="mb-8">
            <li>
              The map serves as an interactive and responsive plot for various
              metrices acquired during constituency elections, held across the
              state.
            </li>
          </ul>
        </fieldset>

        {/* <fieldset>
            <legend>
                <p className='dark:text-yellow-200 text-rose-500'>mesazh</p>
                <span>
                    <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://github.com/mesazh/mesazh-frontend"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://github.com/oceakun"
                    >
                        <LinkIcon/>
                    </a>
                </span>
            </legend>

            <span className='mb-2'>
                <StackIcon/>
                <span className='italic text-sm dark:text-neutral-400'> &nbsp; Next-Typescript, Js, Redux, Styled Components</span>
            </span>

            <span className='mb-5'>
                <HashIcon/>
                <span className='italic text-sm dark:text-neutral-400'> &nbsp; ui,responsive, state management</span>
            </span>

            <span>
            mesazh is a chat application.
            </span>
            
            <ul className="mb-8">
                <li>
                Secure connection with user authentication (with email & passsword / Google LogIn)
                </li>
                <li>
                you can create public/private channels , talk to your contacts with mesazhID or find people on the platform
                </li>
                <li>
                share with your people
                    <ul style={{listStyleType:"circle"}}>
                        <li>
                            audio/video files
                        </li>
                        <li>
                            emojis
                        </li>
                        <li>
                            gifs/images
                        </li>
                        <li>
                            text messages
                        </li>
                    </ul>
                </li>
            </ul>
            
        </fieldset> */}
      </div>
    </section>
  );
}
