import me from '../app/avatar.jpeg';

export const name = 'Sagar Deep';
export const alias = 'oceakun';
export const avatar = me;

export const about = () => {
  return (
    <>
      Hey, I'm Sagar, a <b>Full stack developer</b>.
    </>
  );
};

export const bio = () => {
  return (
    <>
      I graduated with a B.Tech degree in Computer Science Engineering in 2024
      and have been working as a Full Stack Software Engineer ever since. My
      work focuses on building robust, scalable, and maintainable applications
      that blend modern web development with intelligent system design.
    </>
  );
};

export const currentJob = () => {
  return (
    <>
      Currently, I work at <strong>Essentia</strong>, where I maintain and
      extend an enterprise B2B service marketplace with integrated CRM
      functionality. I build automated test suites with Vitest and Playwright,
      implement RBAC, i18n, performance monitoring, and state management using
      Zustand to support multi-tenant workflows. I also develop form-driven
      workflows with schema validation via Zod, build APIs for seamless data
      integration between ERP systems and the platform database, and manage
      production deployments using nginx and Supervisor for staging and
      production environments. <br />
      <br />
      <strong>Tech Stack:</strong> TypeScript, React, Vitest, Zod, Django,
      Python, WeClapp, nginx, Supervisor.
    </>
  );
};

export const prevJob = () => {
  return (
    <>
      Previously at <strong>Navikenz</strong>, I built full-stack applications
      end-to-end, developed microservices and agentic RAG workflows, and led UI
      development across multiple projects. I published reusable NPM packages,
      optimized build pipelines using Vite and Rollup, and deployed production
      systems through AWS Lambda, EC2, S3, and CloudFront. I also set up
      business-critical logging and monitoring systems using AWS CloudWatch and
      LoadBalancer. <br />
      <br />
      <strong>Tech Stack:</strong> TypeScript, FastAPI, Python, LangGraph,
      LangChain, React, Postgres, AWS, pgvector.
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
