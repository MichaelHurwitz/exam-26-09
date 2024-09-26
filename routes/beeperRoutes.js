import express from "express";
import { createBeeperController, getAllBeepersController, updateBeeperStatusController } from "../controllers/beeperController.js";
import { getBeeperById } from "../services/beeperService.js";
const router = express.Router();
router.route('/')
    .post(createBeeperController)
    .get(getAllBeepersController);
router.route('/:id')
    .get(getBeeperById);
router.route('/:id/status').put(updateBeeperStatusController);
export default router;
