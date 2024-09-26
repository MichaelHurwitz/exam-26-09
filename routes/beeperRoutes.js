import express from "express";
import { createBeeperController, getAllBeepersController } from "../controllers/beeperController.js";
const router = express.Router();
router.route('/')
    .post(createBeeperController)
    .get(getAllBeepersController);
export default router;
