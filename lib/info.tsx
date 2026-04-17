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
        className='underline decoration-rose-500 dark:decoration-amber-300 hover:decoration-2 transition-all'
      >
        essentia.dev
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
      <br />
      My work involves designing the architecture of and delivering{' '}
      <b>mobile and web applications</b>.
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
      <b>Tech Stack:</b> TypeScript, React, Python, Django, React Native,
      Vitest, PyTest, Nginx, Docker, AWS
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
