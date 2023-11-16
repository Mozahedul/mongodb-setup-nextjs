import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;
let isCachedConnection = false;

if (!uri) {
  throw new Error("Enter MONGODB_URI in .env file");
}

if (process.env.NODE_ENV === "development") {
  // In development mode use the global variable so that the
  // value is preserved throughout the module reload by HMR Hot Module Replacement
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    isCachedConnection = false;
  } else {
    clientPromise = global._mongoClientPromise;
    isCachedConnection = true;
  }
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Check the database connection whether it is used from
// new connection or cached connection
if (isCachedConnection) {
  console.log("MongoDB database connected from cache");
} else {
  console.log("MongoDB database connected");
}

export default clientPromise;
