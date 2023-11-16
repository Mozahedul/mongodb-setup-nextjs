import Link from "next/link";
import React, { Suspense } from "react";

const fetchSinglePost = async id => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();
  return data;
};

const page = async ({ params }) => {
  const { id } = params;
  const post = await fetchSinglePost(id);
  console.log(post);
  return (
    <Suspense fallback={<div>Loading post...</div>}>
      <div className="container ml-auto mr-auto w-72 bg-gray-100 p-4 rounded-sm">
        <Link
          href={`/code/posts`}
          className="bg-gray-300 text-sm p-2 rounded-sm"
        >
          Go back to posts
        </Link>
        <h2 className="font-bold text-2xl mt-4">{post.title}</h2>
        <p className="mt-4">{post.body}</p>
      </div>
    </Suspense>
  );
};

export default page;
