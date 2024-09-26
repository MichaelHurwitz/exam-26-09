import express from "express";
import { createBeeperController, deleteBeeperController, getAllBeepersController, getBeeperByIdController, getBeepersByStatusController, updateBeeperStatusController } from "../controllers/beeperController.js";
const router = express.Router();
router.route('/')
    .post(createBeeperController)
    .get(getAllBeepersController);
router.route('/:id')
    .get(getBeeperByIdController)
    .delete(deleteBeeperController);
router.route('/:id/status').put(updateBeeperStatusController);
router.get('/status/:status', getBeepersByStatusController);
export default router;
