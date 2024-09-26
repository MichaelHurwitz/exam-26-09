import express, { Router } from "express";
import { createBeeperController, getAllBeepersController } from "../controllers/beeperController.js";

const router: Router = express.Router();

router.route('/')
.post(createBeeperController)
.get(getAllBeepersController);


export default router;