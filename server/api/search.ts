import database from "../../database.json";
import Fuse from "fuse.js";

const IMAGE_RESPONSE_LIMIT = 20;
const VALID_ANIMES = ["myanimelist"];

const isValidAnime = (name: string) =>
  VALID_ANIMES.some(valid => name.toLowerCase().includes(valid));

const filterSearchable = (elems: any[]) =>
  elems.filter(elem => elem.sources.some(isValidAnime));

// @ts-ignore
const animes = filterSearchable(database.data);

const fuse = new Fuse(animes, {
  shouldSort: true,
  threshold: 0.2,
  maxPatternLength: 32,
  keys: ["title", "synonyms"]
});

export const search = (query: string) => {
  const results = fuse.search(query);
  return results.slice(0, IMAGE_RESPONSE_LIMIT);
};
