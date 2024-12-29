import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import indexRoutes from "./routes/router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/submitcontactform", indexRoutes);

// server port listener
const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`Running on a port ${PORT}`);
});
