"use client";
import React, { useState } from "react";

const PostSearch = ({ getSearchResults }) => {
  const [query, setQuery] = useState("");
  console.log("query ==> ", query);
  // handling search form
  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch(`/api/latestposts?title=${query}`);
    const posts = await response.json();
    console.log("FETCH POSTS ==> ", posts);
    getSearchResults(posts);
  };

  return (
    <div className="flex justify-center mt-4 mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 pt-1 pb-1 pl-2"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-gray-200 ml-2 p-2 text-sm">
          Search post
        </button>
      </form>
    </div>
  );
};

export default PostSearch;
