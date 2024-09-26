import express from "express";
import dotenv from "dotenv";
import beeperRouter from "./routes/beeperRoutes.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Beeper Management API");
});
app.use("/api/beepers", beeperRouter);
app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`);
});
