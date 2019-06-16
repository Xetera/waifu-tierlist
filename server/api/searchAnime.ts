// @ts-ignore [not available during compile time]
import database from "../../database.json";
import Fuse from "fuse.js";
import { Anime } from "../../shared/types";

const IMAGE_RESPONSE_LIMIT = 20;
const VALID_ANIMES = ["myanimelist"];

const isValidAnime = (name: string) =>
  VALID_ANIMES.some(valid => name.toLowerCase().includes(valid));

const filterSearchable = (elems: Anime[]) =>
  elems.filter(elem => elem.sources.some(isValidAnime));

// @ts-ignore
const animes = filterSearchable(database.data);

const fuse = new Fuse<Anime>(animes, {
  shouldSort: true,
  threshold: 0.2,
  maxPatternLength: 32,
  keys: ["title", "synonyms"]
});

export const searchAnime = (query: string): Anime[] => {
  const results = fuse.search(query);
  return results.slice(0, IMAGE_RESPONSE_LIMIT);
};

export const getAnime = (id: string): Anime | undefined => {
  const pattern = new RegExp(`myanimelist.net/anime/${id}$`);
  return animes.find(anime =>
    anime.sources.some(source => pattern.test(source))
  );
};
