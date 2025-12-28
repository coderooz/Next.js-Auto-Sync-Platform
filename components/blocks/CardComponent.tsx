/** @format */

import Link from "next/link";

interface PostCardComponentProps {
  title: string;
  link: string;
}

export default function PostCardComponent({
  title,
  link,
}: PostCardComponentProps) {
  return (
    <article className='flex flex-col items-center gap-2 rounded-2xl bg-slate-200 px-4 py-3'>
      <div className='rounded-md h-24 w-24 bg-gray-300 animate-pulse' />

      <h1 className='font-bold uppercase text-center'>{title}</h1>

      <Link href={link} className='text-sm text-blue-600 hover:underline'>
        Go to page →
      </Link>
    </article>
  );
}
