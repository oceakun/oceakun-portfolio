import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Banner from '../_components/Banner';
import BlogHeader from '../_components/BlogHeader';
import CodeBlock from '../_components/CodeBlock';
import Overview from '../_components/Overview';
import References from '../_components/References';

// Custom components for MDX rendering
const components = {
  pre: (props: React.ComponentProps<'pre'>) => {
    const { children, ...rest } = props;
    if (React.isValidElement(children) && children.type === 'code') {
      const codeProps = children.props as {
        children: string;
        className?: string;
      };
      return (
        <CodeBlock className={codeProps.className}>
          {codeProps.children}
        </CodeBlock>
      );
    }
    return <pre {...rest}>{children}</pre>;
  },
  code: (props: React.ComponentProps<'code'>) => {
    const { children, className } = props;
    if (!className) {
      return (
        <code className='bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm'>
          {children}
        </code>
      );
    }
    return <CodeBlock className={className}>{children as string}</CodeBlock>;
  },
  h1: (props: React.ComponentProps<'h1'>) => {
    const { children, ...rest } = props;
    const id =
      typeof children === 'string'
        ? children
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
        : '';
    return (
      <h1
        id={id}
        className='text-2xl dark:text-neutral-200 font-serif mt-8 mb-4'
        {...rest}
      >
        {children}
      </h1>
    );
  },
  h2: (props: React.ComponentProps<'h2'>) => {
    const { children, ...rest } = props;
    const id =
      typeof children === 'string'
        ? children
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
        : '';
    return (
      <h2
        id={id}
        className='text-xl dark:text-neutral-200 font-serif mt-8 mb-4'
        {...rest}
      >
        {children}
      </h2>
    );
  },
  h3: (props: React.ComponentProps<'h3'>) => {
    const { children, ...rest } = props;
    const id =
      typeof children === 'string'
        ? children
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
        : '';
    return (
      <h3
        id={id}
        className='text-lg dark:text-neutral-200 font-serif mt-6 mb-3'
        {...rest}
      >
        {children}
      </h3>
    );
  },
  p: (props: React.ComponentProps<'p'>) => <p className='mb-4' {...props} />,
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className='list-disc list-inside mb-4 space-y-1' {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className='list-decimal list-inside mb-4 space-y-1' {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => <li className='ml-4' {...props} />,
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className='font-semibold' {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className='border-l-4 border-neutral-400 dark:border-neutral-600 pl-4 italic my-4'
      {...props}
    />
  ),
};

type OverviewItem = string | { name: string; subtopics: string[] };

interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  banner?: { title: string; subtitle?: string };
  overview?: OverviewItem[];
  references?: { name: string; url: string }[];
}

function toScrollId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

function transformOverview(overview: OverviewItem[]): {
  name: string;
  scrollToId: string;
  subtopics?: { name: string; scrollToId: string }[];
}[] {
  return overview.map((item) => {
    if (typeof item === 'string') {
      return { name: item, scrollToId: toScrollId(item) };
    }
    return {
      name: item.name,
      scrollToId: toScrollId(item.name),
      subtopics: item.subtopics.map((sub) => ({
        name: sub,
        scrollToId: toScrollId(sub),
      })),
    };
  });
}

function getBlogPost(
  slug: string
): { frontmatter: BlogFrontmatter; content: string } | null {
  try {
    const filePath = join(process.cwd(), 'content', 'blog', `${slug}.md`);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { frontmatter: data as BlogFrontmatter, content };
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  const blogDir = join(process.cwd(), 'content', 'blog');
  const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  return files.map((f) => ({ slug: f.replace(/\.md$/, '') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const { frontmatter, content } = post;

  return (
    <section className='w-full px-4 sm:px-6 md:px-8'>
      {frontmatter.banner && (
        <Banner
          title={frontmatter.banner.title}
          subtitle={frontmatter.banner.subtitle}
        />
      )}
      <div className='prose prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-400 mt-12 text-justify w-full'>
        <BlogHeader
          title={frontmatter.title}
          date={frontmatter.date}
          wordCount={content.trim().split(/\s+/).length}
        />
        <div className='text-justify w-full'>
          {frontmatter.overview && (
            <Overview topics={transformOverview(frontmatter.overview)} />
          )}
          <MDXRemote source={content} components={components} />
          {frontmatter.references && (
            <div id='references'>
              <References refs={frontmatter.references} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
