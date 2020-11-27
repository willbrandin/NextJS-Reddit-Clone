import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import trim from "./middleware/trim";

import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);

app.get("/", (req, res) => res.send("hello world"));

app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
  console.log("Running on http://localhost:5000");
  try {
    await createConnection();
    console.log("Database Connected 🎉");
  } catch (error) {
    console.log(error);
  }
});
