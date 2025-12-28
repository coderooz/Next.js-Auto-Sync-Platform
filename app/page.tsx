/** @format */

import Link from "next/link";
import ApiComponent from "@/components/blocks/ApiKeyItem";
import PostCardComponent from "@/components/blocks/CardComponent";

export default function homePage() {
  return (
    <main className='flex flex-col w-full h-full justify-center items-center'>
      <ApiComponent />
      <PostCardComponent title='Post 1' link='/content/post-1' />
    </main>
  );
}
