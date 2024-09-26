import { Request, Response } from 'express';
import { createBeeper, getAllBeepers } from '../services/beeperService.js';


export const createBeeperController = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        res.send({ error: 'Name is required' }).status(400);
    }

    try {
        const newBeeper = await createBeeper(name);
        res.send({ newBeeper }).status(201);
    } catch (e) {
        res.send({ error: 'Server error' })
    }
};

export const getAllBeepersController = async (req: Request, res: Response) => {
    try {
        const beepers = await getAllBeepers();
        res.send({ beepers }).status(200);
    } catch (e) {
        res.send({ error: 'Server error'}).status(500);
    }
}