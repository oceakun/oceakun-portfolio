import type { Metadata } from 'next';
import { HashIcon } from '../../components/icons';
import Link from 'next/link';
import matter from 'gray-matter';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development.',
};

interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  stack: string;
  tags: string[];
  readyForRelease: boolean;
}

function getAllBlogPosts(): BlogFrontmatter[] {
  const blogDir = join(process.cwd(), 'content', 'blog');
  const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));

  const posts = files.map((file) => {
    const filePath = join(blogDir, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data as BlogFrontmatter;
  });

  return posts;
}

export default function BlogList() {
  const blogList = getAllBlogPosts();

  // Filter to only show blogs that are ready for release
  // In production, also filter out the "ideas" page (only visible on localhost)
  const isDevelopment = process.env.NODE_ENV === 'development';
  const publishedBlogs = blogList.filter((blog) => {
    if (!blog.readyForRelease) return false;
    if (blog.slug === 'ideas' && !isDevelopment) return false;
    return true;
  });

  return (
    <section className='px-4 sm:px-6 md:px-8'>
      <h1 className='font-bold text-3xl text-amber-950 dark:text-neutral-200 font-serif '>
        Blog
      </h1>
      <div className=' text-neutral-800 dark:text-neutral-200 mt-8'>
        <div>
          {publishedBlogs.map((blog, i) => {
            return (
              <div className='my-2' key={i}>
                <Link
                  className='p-2 hover:cursor-pointer no-underline hover:underline w-full flex flex-row justify-between items-end'
                  href={`blog/${blog.slug}`}
                  key={blog.slug}
                >
                  <span className=' text-justify'>
                    <span className=' text-xs text-neutral-500 dark:text-neutral-500 mr-1'>
                      {blog.date},
                    </span>
                    {blog.title}
                  </span>
                </Link>

                <div className='flex flex-row gap-2 flex-wrap '>
                  {/* <HashIcon /> */}

                  {/* {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 text-xs rounded-[5px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                    >
                      {tag}
                    </span>
                  ))} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
