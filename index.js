const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { append } = require("express/lib/response");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/**
 * DATA BASE connection
 */
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.gnvo2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/* async function run() {
  try {
    await client.connect();

    const productCollection = client
      .db("productsDB")
      .collection("productCollection");

    const query = {};
    const cursor = productCollection.find(query);
    const products = await cursor.toArray();

    // since this method returns the matched document, not a cursor, print it directly
    console.log(products.length);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir); */

// home url
app.get("/", (req, res) => {
  res.send("bangla babul store is running");
});

// get all products
app.get("/products", async (req, res) => {
  let products = [];
  try {
    await client.connect();

    const productCollection = client
      .db("productsDB")
      .collection("productCollection");

    const query = {};
    const cursor = productCollection.find(query);
    products = await cursor.toArray();
    console.log(products.length);
  } catch (err) {
    console.err(err.message);
  }

  res.send("products.length");
});

app.listen(port, () => {
  console.log("app is listening ", port);
});
