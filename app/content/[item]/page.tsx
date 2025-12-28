/** @format */

import Markdown from "react-markdown";

export default function ProjectPage({ params }: { params: { item: string } }) {
  const { item } = params;
  return (
    <article className='prose'>
      <Markdown>{project.content}</Markdown>
      <a href={`https://github.com/${project.repo.owner}/${project.repo.name}`}>
        View on GitHub →
      </a>
    </article>
  );
}
