import { MongoClient, ServerApiVersion } from "mongodb";

const api = express.env.ATLAS_URI || "";
const client = new MongoClient(URIError, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("crmsDb").command({ ping: 1 });
  console.log("Pinged your deployment, You successfully connected to MongoDB");
} catch (e) {
  console.error(e);
}

let db = client.db("crmsDb");

export default db;
