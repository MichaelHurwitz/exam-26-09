var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';
export const readFromJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield jsonfile.readFile(DB_FILE_PATH, 'utf-8');
    return data;
});
export const writeBeeperToJsonFile = (beepersOrSingleBeeper_1, ...args_1) => __awaiter(void 0, [beepersOrSingleBeeper_1, ...args_1], void 0, function* (beepersOrSingleBeeper, writeAll = false) {
    if (writeAll) {
        // If writeAll is true, write the full array of users to the file
        yield jsonfile.writeFile(DB_FILE_PATH, beepersOrSingleBeeper);
    }
    else {
        // Else, append a single user to the existing array
        const beepers = yield jsonfile.readFile(DB_FILE_PATH);
        beepers.push(beepersOrSingleBeeper);
        yield jsonfile.writeFile(DB_FILE_PATH, beepers);
    }
});
