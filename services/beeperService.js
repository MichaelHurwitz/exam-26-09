var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BeeperStatus } from "../models/beeper.js";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";
import { coordinates } from "../coordinates/coordinates.js";
export const createBeeper = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const existingBeeper = beepers.find((b) => b.name === name);
    if (existingBeeper) {
        throw new Error("Beeper already exists");
    }
    const newBeeper = {
        id: uuidv4(),
        name,
        status: BeeperStatus.Manufactured,
        created_at: new Date(),
    };
    yield writeBeeperToJsonFile(newBeeper);
    return newBeeper;
});
export const getAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield readFromJsonFile();
});
export const getBeeperById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getAllBeepers();
    const beeper = beepers.find((b) => b.id === id);
    return beeper || null;
});
const areCoordinatesValid = (lat, lon) => {
    return coordinates.some((c) => c.lat === lat && c.lon === lon);
};
const scheduleDetonation = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const beepers = yield getAllBeepers();
        const beeperIndex = beepers.findIndex((b) => b.id === beeper.id);
        if (beeperIndex === -1) {
            throw new Error("Beeper not found for detonation");
        }
        beepers[beeperIndex].status = BeeperStatus.Detonated;
        beepers[beeperIndex].exploded_at = new Date();
        yield writeBeeperToJsonFile(beepers, true);
    }), 10000);
});
export const updateBeeperStatus = (id, newStatus, lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getAllBeepers();
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
        }
        else {
            throw new Error("Invalid coordinates");
        }
    }
    else {
        beeper.status = newStatus;
    }
    beepers[beeperIndex] = beeper;
    yield writeBeeperToJsonFile(beepers, true);
    return beeper;
});
export const deleteBeeper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getAllBeepers();
    const beeperIndex = beepers.findIndex((beeper) => beeper.id === id);
    if (beeperIndex === -1) {
        throw new Error("Beeper not found");
    }
    beepers.splice(beeperIndex, 1);
    yield writeBeeperToJsonFile(beepers, true);
    return { message: `Beeper with ID: ${id} has been deleted successfully` };
});
export const getBeepersByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getAllBeepers();
    const beepersByStatus = beepers.filter((beeper) => beeper.status === status);
    if (beepersByStatus.length === 0) {
        throw new Error(`No beepers found with status: ${status}`);
    }
    return beepersByStatus;
});
