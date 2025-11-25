import type { Metadata } from 'next';
import {
  GitHubIcon,
  LinkIcon,
  StackIcon,
  HashIcon,
} from '../../components/icons';
import Carousel from '../../components/Carousel';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Code and deployment links for the projects',
};

const projects = [
  {
    name: 'csv-visualizer',
    links: {
      github: 'https://github.com/oceakun/csv-visualizer',
      deployed: 'https://github.com/oceakun',
    },
    stack:
      'Astro, React-components, Js, Grafana, Go, Firebase Auth, Firestore, Docker',
    tags: 'full stack, visualization, authentication, API, containerization',
    previewImages: [],
    shortDescription:
      'visualize csv-exports through grafana panels, in the form of highly interactive tables and charts',
    listedDescription: [
      'The app provides a beautiful and intuitive interface, wherein, the user can upload a csv file and view visualizations in the form of tables and plots. The user can also create an account and save the generated visualizations to their profile, which can be viewed later on and shared with anyone else throuhg url sharing',
      'The app boasts features such as responsive design, user authentication, and a loosely coupled architecture',
    ],
    active: false,
  },
  {
    name: 'stickz',
    links: {
      github: 'https://github.com/oceakun/stickz-frontend',
      deployed: 'https://stickz.vercel.app/home',
    },
    stack: 'Typescript-React, Context API, Styled Components',
    tags: 'ui,responsive, state management',
    previewImages: [],
    shortDescription:
      'an online solution for note-taking. It allows users to take down textual notes and embed images as well.',
    listedDescription: [
      "The application leverages local storage to store data pertaining to each session, if its a one-time user, but in case of an authenticated user, file's content can be saved to database.",
      'Data can be stored and organized in the form of files and folders. The created files can be searched through, downloaded, shared and deleted. In addition, it avails a responsive interface, mutliple-themes and configurations panels for manipulating editor settings.',
    ],
    active: false,
  },
  {
    name: 'state-map',
    links: {
      github: 'https://github.com/oceakun/state-map-d3',
      deployed: 'https://d3-exercise.vercel.app/',
    },
    stack: 'Js, d3, HTMl, CSS',
    tags: 'visualization, responsive',
    previewImages: [],
    shortDescription:
      "a map of the Indian state 'Haryana', for the categorical visualizations of consitutency elections.",
    listedDescription: [
      'The map serves as an interactive and responsive plot for various metrices acquired during constituency elections, held across the state.',
    ],
    active: false,
  },
  {
    name: 'get-repos',
    links: {
      github: 'https://github.com/oceakun/fyle-internship-challenge-23',
      deployed:
        'https://654a42ff71ad24305eea15ec--golden-custard-8a760d.netlify.app/',
    },
    stack: 'Angular, TailwindCSS, Github API',
    tags: 'skeleton-loader, responsive, server-side pagination',
    previewImages: [],
    shortDescription: "retrieves a user's public repositories from GitHub",
    listedDescription: [
      'Provides an easy-to-use interface where users can input a GitHub username, and the application fetches and displays all the public repositories associated with that username.',
    ],
    active: false,
  },
  {
    name: 'admin-dashboard',
    links: {
      github: 'https://github.com/oceakun/admin-dashboard',
      deployed: 'https://admin-dashboard-oceakun.vercel.app/',
    },
    stack: 'Next.js, TailwindCSS',
    tags: 'admin-dashboard, responsive, pagination',
    previewImages: [],
    shortDescription: 'admin dashboard to view and edit data',
    listedDescription: [
      'Dashboard to view, search and edit data(in place deleting and editting).',
    ],
    active: false,
  },
  {
    name: 'dcm',
    links: {
      github: 'https://github.com/oceakun/dcm',
      deployed: 'https://github.com/oceakun/dcm',
    },
    stack: 'Go, termui, tview, gopsutil',
    tags: 'system monitoring, CLI tool, real-time metrics, terminal UI',
    previewImages: ['/dcm_dashboard.png', '/dcm_processes_table.png'],
    shortDescription:
      'A terminal-based system monitoring tool that displays real-time system metrics in an interactive command-line interface',
    listedDescription: [
      'Provides a live dashboard with real-time visualization of CPU usage, memory consumption, core temperature, and network interface information.',
      'Features an interactive process table that allows dynamic process management, enabling users to interact with running processes directly from the terminal.',
      'Built with termui and tview libraries for creating an intuitive and responsive terminal-based user interface.',
    ],
    active: true,
  },
  {
    name: 'chariotx',
    links: {
      github: 'https://github.com/oceakun/chariotx',
      deployed: 'https://github.com/oceakun/chariotx',
    },
    stack: 'Go, TypeScript, Docker, Shell, JavaScript, CSS',
    tags: 'EDA, Microservices, Full Stack, Map Service, Cab Service, Trip Planner',
    previewImages: [],
    shortDescription:
      'An event-driven architecture based service that combines cab, map, and trip planning functionality into a unified platform',
    listedDescription: [
      'Built with a microservices approach where individual services are organized in dedicated directories with their own documentation, enabling modular development and scalability.',
      'Utilizes event-driven design as the core architectural pattern, enabling asynchronous communication between components for better performance and decoupling.',
      'Features a comprehensive infrastructure layer for deployment and a dedicated frontend UI, combining Go backend services with TypeScript frontend for a full-stack solution.',
    ],
    active: true,
  },
];

export default function ProjectPage() {
  return (
    <section>
      <h1 className='font-bold text-3xl dark:text-neutral-200 font-serif'>
        Projects
      </h1>
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200 '>
        {projects
          .filter((project) => project.active)
          .map((project) => (
            <div key={project.name}>
              <div className='flex items-center gap-4 justify-between border-b-[1px] border-neutral-300 dark:border-neutral-700 mb-6'>
                <p className='dark:text-yellow-200 text-rose-500'>
                  {project.name}
                </p>
                <div className='flex items-center gap-4 justify-between'>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={project.links.github}
                  >
                    <GitHubIcon />
                  </a>
                  <a
                    rel='noopener noreferrer'
                    target='_blank'
                    href={project.links.deployed}
                  >
                    <LinkIcon />
                  </a>
                </div>
              </div>
              {/* <hr className='border-neutral-300 dark:border-neutral-700' /> */}

              <span className='flex flex-row items-start mb-2 w-full'>
                <StackIcon />
                <span className='italic text-sm dark:text-neutral-400 '>
                  {' '}
                  &nbsp; {project.stack}
                </span>
              </span>

              <span className='flex flex-row mb-5'>
                <HashIcon />
                <span className='italic text-sm dark:text-neutral-400 '>
                  {' '}
                  &nbsp; {project.tags}
                </span>
              </span>

              {project.previewImages && project.previewImages.length > 0 && (
                <Carousel images={project.previewImages} altPrefix={project.name} />
              )}

              <span>{project.shortDescription}</span>

              <ul className='mb-8'>
                {project.listedDescription.map((description, index) => (
                  <li key={index}>{description}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </section>
  );
}
