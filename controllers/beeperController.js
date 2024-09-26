var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBeeper, getAllBeepers, getBeeperById, updateBeeperStatus } from '../services/beeperService.js';
export const createBeeperController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400).send({ error: 'Name is required' });
    }
    try {
        const newBeeper = yield createBeeper(name);
        res.status(201).send({ newBeeper });
    }
    catch (e) {
        res.status(500).send({ error: 'Server error' });
    }
});
export const getAllBeepersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getAllBeepers();
        res.status(200).send({ beepers });
    }
    catch (e) {
        res.status(500).send({ error: 'Server error' });
    }
});
export const getBeeperByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const beeper = yield getBeeperById(id);
        if (!beeper) {
            return res.status(404).send({ error: 'Beeper not found' });
        }
        return res.status(200).send(beeper);
    }
    catch (e) {
        return res.status(500).send({ error: 'internal server error' });
    }
});
export const updateBeeperStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, lat, lon } = req.body;
    if (!id || !status) {
        return res.status(400).send({ error: 'ID and status are required' });
    }
    try {
        const updatedBeeper = yield updateBeeperStatus(id, status, lat, lon);
        return res.status(200).send(updatedBeeper);
    }
    catch (error) {
        return res.status(500).send({ error: 'internal server error' });
    }
});
