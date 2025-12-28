/** @format */

import Link from "next/link";
import { Card } from "../ui/card";

interface PostCardComponentProps {
  title: string;
  link: string;
}

export default function PostCardComponent({
  title,
  link,
}: PostCardComponentProps) {
  return (
    <article className='flex flex-col items-center gap-2 rounded-2xl bg-slate-200 px-4 py-2'>
      <div className='rounded-md h-25 w-25 bg-gray-300 animate-pulse' />
      <h1 className='font-bold uppercase cursor-pointer hover:undeline'>
        {title}
      </h1>
      <Link href={link} className='text-sm text-blue-300 hover:underline'>
        Go to page
      </Link>
    </article>
  );
}
