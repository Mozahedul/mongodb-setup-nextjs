import { NextResponse } from "next/server";
import postData from "../server/data.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("title");
  const filteredPosts = postData.filter(post => {
    return post.title.toLowerCase().includes(query.toLowerCase());
  });
  return NextResponse.json(filteredPosts);
}
