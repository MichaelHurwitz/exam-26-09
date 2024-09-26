import { Beeper } from "../models/beeper.js";
import { v4 as uuidv4 } from 'uuid';
import { readFromJsonFile, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";



export const createBeeper = async (name: string): Promise<Beeper> => {
    const beepers = await readFromJsonFile();

    const newBeeper: Beeper = {
        id: uuidv4(),
        name,
        status: 'manufactured',
        created_at: new Date,
    };

    beepers.push(newBeeper);
    await writeBeeperToJsonFile(beepers);

    return newBeeper;
}

export const getAllBeepers = async (): Promise<Beeper[]> => {
    return await readFromJsonFile();
};