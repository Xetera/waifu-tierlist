import { get } from "../utils/http";
import { promisify } from "util";
import * as fs from "fs";

const writeFileAsync = promisify(fs.writeFile).bind(fs);

const DATABASE_ENDPOINT =
  "https://github.com/manami-project/anime-offline-database/blob/master/anime-offline-database.json?raw=true";

export const init = async () => {
  try {
    fs.statSync("./database.json");
    console.log("> database.json already exists, skipping download");
  } catch (_) {
    console.log("> Downloading database.json");
    const json = await get(DATABASE_ENDPOINT);
    await writeFileAsync("./database.json", JSON.stringify(json));
    console.log("> Download finished!");
  }
};
