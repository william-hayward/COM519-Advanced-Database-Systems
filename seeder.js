
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;


/**
 * constants
 */
const client = new MongoClient(MONGODB_URI);
/**
 * constants
 */

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("games").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
      db.dropDatabase();
    }

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing your games!!").start();

    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "games.json"), "utf8");
    await db.collection("games").insertMany(JSON.parse(data));

    const dataTwo = await fs.readFile(path.join(__dirname, "user.json"), "utf-8");
    await db.collection("users").insertMany(JSON.parse(dataTwo));
    
   
    load.stop();
    console.info(
      `game collection set up!`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
