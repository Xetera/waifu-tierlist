// @ts-ignore [not available during compile time]
// import database from "../../database.json";
import Fuse from "fuse.js";
import { Anime } from "../../shared/types";

const IMAGE_RESPONSE_LIMIT = 20;
const VALID_ANIMES = ["myanimelist"];

const isValidAnime = (name: string) =>
  VALID_ANIMES.some(valid => name.toLowerCase().includes(valid));

const filterSearchable = (elems: Anime[]) =>
  elems.filter(elem => elem.sources.some(isValidAnime));

// @ts-ignore
const animes = import("../../database.json").then(database =>
  // @ts-ignore
  filterSearchable(database.data)
);

const fuse = animes.then(
  ams =>
    new Fuse<Anime>(ams, {
      shouldSort: true,
      threshold: 0.2,
      maxPatternLength: 32,
      keys: ["title", "synonyms"]
    })
);

export const searchAnime = async (query: string): Promise<Anime[]> => {
  const fs = await fuse;
  const results = fs.search(query);
  return results.slice(0, IMAGE_RESPONSE_LIMIT);
};

export const getAnime = async (id: string): Promise<Anime | undefined> => {
  const pattern = new RegExp(`myanimelist.net/anime/${id}$`);
  const ams = await animes;
  return ams.find((anime: Anime) =>
    anime.sources.some(source => pattern.test(source))
  );
};
