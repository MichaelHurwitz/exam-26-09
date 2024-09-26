import { Request, Response } from 'express';
import { createBeeper, getAllBeepers, getBeeperById, updateBeeperStatus } from '../services/beeperService.js';
import { BeeperStatus } from '../models/beeper.js';


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

export const getBeeperByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const beeper = await getBeeperById(id);
        if (!beeper) {
            return res.status(404).send({ error: 'Beeper not found'});
        }
        return res.status(200).send(beeper);
    } catch (e) {
        return res.status(500).send({ error: 'internal server error'});
    }
};

export const updateBeeperStatusController = async (req: Request, res: Response) => {
    const { id } = req.params;  
    const { status, lat, lon } = req.body;  

    if (!id || !status) {
        return res.status(400).send({ error: 'ID and status are required' });
    }

    try {
        const updatedBeeper = await updateBeeperStatus(id, status as BeeperStatus, lat, lon);
        return res.status(200).send(updatedBeeper);
    } catch (error) {
        return res.status(500).send({ error: 'internal server error' });
    }
};