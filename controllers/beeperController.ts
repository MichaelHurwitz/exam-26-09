import { Request, Response } from 'express';
import { createBeeper, getAllBeepers } from '../services/beeperService.js';


export const createBeeperController = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ error: 'Name is required' });
    }

    try {
        const newBeeper = await createBeeper(name);
        res.status(201).send({ newBeeper });
    } catch (e) {
        res.status(500).send({ error: 'Server error' })
    }
};

export const getAllBeepersController = async (req: Request, res: Response) => {
    try {
        const beepers = await getAllBeepers();
        res.status(200).send({ beepers });
    } catch (e) {
        res.status(500).send({ error: 'Server error'});
    }
}