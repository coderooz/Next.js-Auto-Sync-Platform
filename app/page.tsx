/** @format */

import ApiComponent from "@/components/blocks/ApiKeyItem";
import PostCardComponent from "@/components/blocks/CardComponent";
import { getAllProjects } from "@/lib/actions/project";

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <main className='flex flex-col gap-6 w-full h-full items-center p-6'>
      <ApiComponent />

      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <PostCardComponent
            key={project.slug}
            title={project.name}
            link={`/content/${project.slug}`}
          />
        ))}
      </section>
    </main>
  );
}
