// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
// Global Variables
export const collections: { 
  projects?: mongoDB.Collection;
  users?:mongoDB.Collection
} = {}

// Initialize Connection

const connString:string = process.env.DB_CONN_STRING ?? "filler" 
const collString:string = process.env.COLLECTION_NAME ?? "filler"
const JWT_SECRET = process.env.JWT_SECRET ?? "filler";

export async function connectToDatabase () {
  console.log(JWT_SECRET)
  console.log(`Connecting to MongoDB at: ${connString}`);

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connString);
          
  try {
      await client.connect();
      const db: mongoDB.Db = client.db("testdb");
 
      const projectsCollection: mongoDB.Collection = db.collection("projects");
      const usersCollection: mongoDB.Collection = db.collection("users");

      collections.projects = projectsCollection;
      collections.users = usersCollection;
     
      console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (error) {
      console.error("Database connection failed:", error);
      throw error; // Rethrow the error to indicate failure
  }
}