import type { Metadata } from 'next';
import {
  GitHubIcon,
  ArrowIcon,
  TwitterIcon,
  LinkedinIcon
} from 'components/icons';

export const metadata: Metadata = {
  title: 'About',
  description: 'Intern at IIT Delhi.',
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl dark:text-neutral-200 font-serif">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey, I'm Sagar, I go by <b>oceakun</b> online.
      </p>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          I'm currently interning at <b>IIT Delhi</b> while going through my senior year of <b>Computer Science Engineering</b> at Amity University, Noida, India.
        </p>
        
        <fieldset>
        <legend className='dark:text-yellow-200 text-rose-500'>|\/?&^*%$@#{`>`}</legend>
        <p>
          As an intern at IIT Delhi, my daily deliverables are mostly related to developing frontend components by refering to their Figma design and documentating their functionality after I'm done. 
          </p>
          <p>
          Outside of work, I love building feature rich applications with minimalist design as side projects.
          </p>
          <p className="mb-8">
          To quench my curiosity, I'm always reading blogs on new technological concepts. Moreover, I believe in learning through practicing so, for every piece of software I read about, I develop small projects, to make my knowledge of the same, concrete.
          </p>
        </fieldset>
        
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/oceakun"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 hover:dark:border-neutral-700 hover:cursor-pointer rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/sagar-deep/"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 hover:dark:border-neutral-700 hover:cursor-pointer rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <LinkedinIcon />
              <div className="ml-3">Linkedin</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/oceakun"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 hover:dark:border-neutral-700 hover:cursor-pointer rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">Twitter</div>
            </div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}