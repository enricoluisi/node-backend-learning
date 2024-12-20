// Importing the dotenv module to handle environment variables
// The "config" method loads the .env file and makes its variables accessible via process.env
import "dotenv/config";
// Importing ObjectId from the 'mongodb' module to work with MongoDB object IDs
import { ObjectId } from "mongodb";
// Importing the 'connectToDatabase' function to establish the database connection
import connectToDatabase from "../config/dbConfig.js";

// Establishing the database connection using the function from dbConfig.js
// The connection string is retrieved from the environment variable `STRING_CONNECTION`
const connection = await connectToDatabase(process.env.STRING_CONNECTION);

// Function to fetch all posts from the MongoDB database
// It connects to the "backend-db" database and retrieves data from the "posts" collection
export async function getAllPosts() {
    // Connect to the "backend-db" database and access the "posts" collection
    const db = connection.db("backend-db");
    const collection = db.collection("posts");
    
    // Retrieve all documents from the collection as an array and return it
    return collection.find().toArray();
}

// Function to add a new post to the MongoDB database
// It connects to the "backend-db" database and inserts a new document into the "posts" collection
export async function createPost(newPost) {
    // Connect to the "backend-db" database and access the "posts" collection
    const db = connection.db("backend-db");
    const collection = db.collection("posts");

    // Insert the new post object into the collection and return the result
    return collection.insertOne(newPost);
}

// Function to update an existing post in the MongoDB database
// It connects to the "backend-db" database and modifies data in the "posts" collection
export async function updatePost(id, newPost) {
    // Connect to the "backend-db" database and access the "posts" collection
    const db = connection.db("backend-db");
    const collection = db.collection("posts");

    // Convert the post ID to an ObjectId to use in the update query
    const objID = ObjectId.createFromHexString(id);

    // Update the post with the specified ID and new data, then return the result
    return collection.updateOne({ _id: new ObjectId(objID) }, { $set: newPost });
}
