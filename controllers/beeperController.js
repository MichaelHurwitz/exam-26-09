var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBeeper, getAllBeepers } from '../services/beeperService.js';
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
