import { Beeper, BeeperStatus } from "../models/beeper.js";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";
import { coordinates } from "../coordinates/coordinates.js";

export const createBeeper = async (name: string): Promise<Beeper> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const existingBeeper = beepers.find((b) => b.name === name);

  if (existingBeeper) {
    throw new Error("Beeper already exists");
  }

  const newBeeper: Beeper = {
    id: uuidv4(),
    name,
    status: BeeperStatus.Manufactured,
    created_at: new Date(),
  };

  await writeBeeperToJsonFile(newBeeper);

  return newBeeper;
};

export const getAllBeepers = async (): Promise<Beeper[]> => {
  return await readFromJsonFile();
};

export const getBeeperById = async (id: string): Promise<Beeper | null> => {
  const beepers = await getAllBeepers();

  const beeper = beepers.find((b) => b.id === id);
  return beeper || null;
};

const areCoordinatesValid = (lat: number, lon: number) => {
  return coordinates.some((c) => c.lat === lat && c.lon === lon);
};

const scheduleDetonation = async (beeper: Beeper) => {
  setTimeout(async () => {
    const beepers = await getAllBeepers();

    const beeperIndex = beepers.findIndex((b) => b.id === beeper.id);
    if (beeperIndex === -1) {
      throw new Error("Beeper not found for detonation");
    }

    beepers[beeperIndex].status = BeeperStatus.Detonated;
    beepers[beeperIndex].exploded_at = new Date();

    await writeBeeperToJsonFile(beepers, true);
  }, 10000);
};

export const updateBeeperStatus = async (
  id: string,
  newStatus: BeeperStatus,
  lat?: number,
  lon?: number
): Promise<Beeper | null> => {
  const beepers = await getAllBeepers();

  const beeperIndex = beepers.findIndex((b) => b.id === id);

  if (beeperIndex === -1) {
    throw new Error("Beeper not found");
  }

  const beeper = beepers[beeperIndex];

  if (lat != undefined && lon != undefined) {
    if (areCoordinatesValid(lat, lon)) {
      beeper.status = BeeperStatus.Deployed;
      beeper.latitude = lat;
      beeper.longitude = lon;
      scheduleDetonation(beeper);
    } else {
      throw new Error("Invalid coordinates");
    }
  } else {
    beeper.status = newStatus;
  }

  beepers[beeperIndex] = beeper;
  await writeBeeperToJsonFile(beepers, true);
  return beeper;
};
