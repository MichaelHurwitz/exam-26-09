import express, { Router } from "express";
import { createBeeperController, getAllBeepersController } from "../controllers/beeperController";

const router: Router = express.Router();

router.route('/')
.post(createBeeperController)
.get(getAllBeepersController);