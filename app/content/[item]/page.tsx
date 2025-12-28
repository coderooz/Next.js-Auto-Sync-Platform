/** @format */

import { Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { getProjectBySlug } from "@/lib/actions/project";

export default async function ProjectPage({
  params,
}: {
  params: { item: string };
}) {
  const { item } = await params;
  const project = await getProjectBySlug(item);

  if (!project) {
    notFound();
  }

  return (
    <main className='max-w-3xl mx-auto px-6 py-12'>
      <article className='prose prose-slate'>
        <h1 className='font-bold text-4xl mb-5'>{project.name}</h1>

        <Markdown>{project.content}</Markdown>

        {project.githubLink && (
          <Link
            href={project.githubLink}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block mt-6 font-medium text-blue-600'
          >
            View on GitHub →
          </Link>
        )}
      </article>
      <Link
        href='/'
        className='flex items-center gap-0.5 hover:underline underline-offset-2 hover:text-blue-600 cursor-pointer font-serif'
      >
        <Home className='h-4 w-4' />
        Back to home
      </Link>
    </main>
  );
}
