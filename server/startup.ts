import { get } from "../shared/http";
import { promisify } from "util";
import * as fs from "fs";
import mongoose from "mongoose";

const url = process.env.DB_URL || process.env.WAIFU_TIERLIST_MONGODB_URL;
mongoose
  .connect(url || "missing mongodb url", { useNewUrlParser: true })
  .catch(() =>
    console.log(
      "> Unable to connect to mongodb, saving functionality will be disabled"
    )
  );

const writeFileAsync = promisify(fs.writeFile).bind(fs);

const DATABASE_ENDPOINT =
  "https://github.com/manami-project/anime-offline-database/blob/master/anime-offline-database.json?raw=true";
const DOWNLOAD_LOCATION = "./database.json";

export const init = async () => {
  try {
    fs.statSync(DOWNLOAD_LOCATION);
    console.log("> database.json already exists, skipping download");
  } catch (_) {
    console.log("> Downloading database.json");
    const json = await get(DATABASE_ENDPOINT);
    await writeFileAsync(DOWNLOAD_LOCATION, JSON.stringify(json));
    console.log("> Download finished!");
  }
};
