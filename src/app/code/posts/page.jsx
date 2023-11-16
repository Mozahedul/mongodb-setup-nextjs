"use client";
import PostSearch from "@/app/components/PostSearch";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { BsFillCCircleFill } from "react-icons/bs";

const Page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          next: { revalidate: 60 },
        }
      );
      const posts = await response.json();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <PostSearch getSearchResults={results => setPosts(results)} />
      <Suspense fallback={<div>Loading Posts...</div>}>
        <div className="flex flex-wrap justify-center">
          {posts.map(post => (
            <div key={post.id} className="w-48 m-2 bg-slate-100 p-4">
              <Link href={`/code/${post.id}`}>
                <div className="font-bold text-lg">
                  <BsFillCCircleFill />
                  {post.title}
                </div>
                <p className="text-sm mt-4">{post.body}</p>
              </Link>
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default Page;
