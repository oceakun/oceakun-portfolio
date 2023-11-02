import type { Metadata } from 'next';
import { StackIcon, HashIcon } from "../../components/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development.",
};

export default function BlogList() {
  const blogList = [
    {
      title:
        "Persistent and flickerless 'Dark theme'",
      slug: "/persistent-and-flicker-less-dark-theme",
      date: "25-09-2023",
      stack: "Next, TailwindCSS, React, Styled Components",
      topic: "Frontend",
    },
    {
      title: "Grafana as a local service and beyond",
      slug: "/grafana-as-a-local-service",
      date: "22-09-2023",
      stack: "Grafana, Docker-compose",
      topic: "Data Visualization",
    },
  ];

  return (
    <section>
      <h1 className="font-bold text-3xl dark:text-neutral-200 font-serif ">
        Blog
      </h1>
      <div className=" text-neutral-800 dark:text-neutral-200 mt-8">
        <div >
          {blogList.map((blog, i) => {
            return (
              <div className="mb-8 mt-8" key={i}>
                <Link
                  className="p-2 hover:cursor-pointer dark:hover:bg-neutral-800 hover:rounded-md  hover:bg-neutral-100 no-underline w-full flex flex-row justify-between items-end 
              dark:border-neutral-800 border-b-[2px] border-neutral-200 dark:border-neutral-800 "
                  href={`blog/${blog.slug}`}
                  key={blog.slug}
                >
                  <span className="font-normal italic text-justify">
                    {blog.title}
                  </span>
                  {/* <span className="font-[200] text-[14px] dark:text-yellow-200 text-rose-500">
                    {blog.date}
                  </span> */}
                </Link>

                <span className="flex flex-row gap-[10px] text-justify mt-2">
                  <HashIcon />
                  <span className="italic italic text-sm dark:text-neutral-400 ">
                    {blog.topic}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}