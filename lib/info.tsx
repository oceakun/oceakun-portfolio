import me from '../app/avatar.jpeg';

export const name = 'Sagar Deep';
export const alias = 'oceakun';
export const avatar = me;

export const about = () => {
  return (
    <>
      Hey, I'm Sagar, an <b>SDE 1</b> at{' '}
      <a
        href='https://essentia.dev/'
        target='_blank'
        rel='noopener noreferrer'
        className='underline decoration-rose-500 dark:decoration-yellow-200 hover:decoration-2 transition-all'
      >
        essentia(.dev)
      </a>
      .
    </>
  );
};

export const bio = () => {
  return (
    <>
      I graduated with a B.Tech degree in{' '}
      <b>Computer Science Engineering in June 2024</b> and have been working as
      a Software Engineer ever since.
      <br />
      <br />A majority of my work now focuses on {' '}
      <b>productionizing </b> small to medium scale{' '}
      <b> applications</b> by re-designing and re-writing major
      features (sometimes, even the whole app) which includes:
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>1. Implementing best coding practices</i>
      </span>
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>2. Adding comprehensive test coverage</i>
      </span>
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>3. Improving type safety and error handling</i>
      </span>
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>4. Benchmarking and optimizing performance</i>
      </span>
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>5. Preparing and owning staging environments</i>
      </span>
      <br />
      <br />Here are a few types of projects that I have contributed to:
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>1. Enterprise B2B service marketplace with integrated CRM (React, Django and ERP system)</i>
      </span>
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>2. Server-rendered travel platform with SEO optimization having integrated CMS (React and Nodejs)</i>
      </span>
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;<i>3. Social networking platform with real-time messaging and availability matching(React Native and Firebase)</i>
      </span>
      <br />
      <br />
      <span>
        In addition to my client work, I also <b>mentor interns</b> on their
        respective projects.
      </span>
    </>
  );
};

export const currentJob = () => {
  return (
    <>
      {/* Currently, I work at <b>Essentia</b>, where I maintain and
      extend an enterprise B2B service marketplace with integrated CRM
      functionality. I build automated test suites with Vitest and Playwright,
      implement RBAC, i18n, performance monitoring, and state management using
      Zustand to support multi-tenant workflows. I also develop form-driven
      workflows with schema validation via Zod, build APIs for seamless data
      integration between ERP systems and the platform database, and manage
      production deployments using nginx and Supervisor for staging and
      production environments. <br />
      <br /> */}
      <b>Tech Stack:</b> TypeScript, React, Next, Python, Django, React Native,
      Vitest, PyTest, Nginx, Docker
    </>
  );
};

export const summary = () => {
  return (
    <>
      I'm passionate about building performant software systems, integrating
      AI-driven workflows, and continually improving developer experience
      through automation and clean architectural design.
    </>
  );
};
