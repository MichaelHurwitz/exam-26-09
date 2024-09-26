import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import beeperRouter from "./routes/beeperRoutes.js";

dotenv.config();

const PORT: number | string = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Beeper Management API");
});

app.use("/api/beepers", beeperRouter);

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
