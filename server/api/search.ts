import database from "../../database.json";
import Fuse from "fuse.js";

// @ts-ignore
const fuse = new Fuse(database.data, {
  shouldSort: true,
  threshold: 0.3,
  keys: ["title", "synonyms"]
});

export const searchMal = (query: string) => fuse.search(query).slice(0, 10);
