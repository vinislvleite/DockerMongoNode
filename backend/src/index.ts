import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db.js";
import itemsRouter from "./routes/Itens.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", itemsRouter);

connectDB().then(() => {
  app.listen(process.env.PORT, () => console.log(`Rodando na ${process.env.PORT}`));
});