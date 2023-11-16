import clientPromise from "@/app/database/mongodb";
import { NextResponse } from "next/server";
// import posts from "./data.json";

// export async function POST(request) {
//   const { title, body } = await request.json();
//   console.log(title, body);
//   return new Response("Post created");
// }

export async function GET(request) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("nextjsdb");
    const collection = db.collection("persons");
    const posts = await collection.find({}).toArray();
    const data = new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
