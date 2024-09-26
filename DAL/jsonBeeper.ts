import jsonfile from 'jsonfile';
import { Beeper } from "../models/beeper.js";

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';


export const readFromJsonFile = async (): Promise<Beeper[]> => {
    const data: Beeper[] = await jsonfile.readFile(DB_FILE_PATH, 'utf-8');
    return data;
};

export const writeBeeperToJsonFile = async (beepersOrSingleBeeper: Beeper[] | Beeper, writeAll: boolean = false): Promise<void> => {
    if (writeAll) {
      // If writeAll is true, write the full array of users to the file
      await jsonfile.writeFile(DB_FILE_PATH, beepersOrSingleBeeper as Beeper[]);
    } else {
      // Else, append a single user to the existing array
      const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
      beepers.push(beepersOrSingleBeeper as Beeper);
      await jsonfile.writeFile(DB_FILE_PATH, beepers);
    }
  };