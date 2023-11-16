import { NextResponse } from "next/server";
// import upload from "../image-process/multer";
import clientPromise from "@/app/database/mongodb";
import slugify from "slugify";
import { ObjectId } from "mongodb";

/**
 * @param {*} request
 * @method POST
 * @ROUTE /api/product
 * @access private
 * @returns success for product insertion or product exist message
 */
export async function POST(request) {
  const data = await request.json();
  console.log("PRODUCT IN BACKEND ==> ", data);
  data.slug = slugify(data.title.toLowerCase());

  const mongoClient = await clientPromise;
  const db = mongoClient.db("nextjsdb");
  const collection = db.collection("products");

  // check the product exist in product collection or not
  const isProductExist = await collection.findOne({ slug: data.slug });
  if (isProductExist && isProductExist.slug) {
    return new NextResponse(
      JSON.stringify({ msg: "Product already exists in DB" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const info = await collection.insertOne(data);
  return new NextResponse(
    JSON.stringify({ success: "Proudct added successfully" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * @param {*} request
 * @method GET
 * @Route /api/product
 * @access public
 * @return all the products data
 */

export async function GET(request) {
  const mongoClient = await clientPromise;
  const db = mongoClient?.db("nextjsdb");
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();
  return new NextResponse(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * @param {*} request
 * @method DELETE
 * @ROUTE /api/product
 * @access private
 * @return delete message
 */

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  // Database query
  const mongoClient = await clientPromise;
  const db = mongoClient?.db("nextjsdb");
  const collection = db.collection("products");

  // Delete the product from db
  const product = await collection.deleteOne({ _id: new ObjectId(id) });
  if (product.deletedCount) {
    return new NextResponse(
      JSON.stringify({ success: "Product deleted successfully" })
    );
  } else {
    return new NextResponse(JSON.stringify({ msg: "Product is not deleted" }));
  }
}
