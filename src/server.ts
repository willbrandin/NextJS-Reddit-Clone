import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import trim from "./middleware/trim";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import subRoutes from "./routes/subs";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/subs", subRoutes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Running on http://localhost:${PORT}`);
  try {
    await createConnection();
    console.log("Database Connected 🎉");
  } catch (error) {
    console.log(error);
  }
});
