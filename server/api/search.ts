import database from "../../database.json";
import Fuse from "fuse.js";

// @ts-ignore
const fuse = new Fuse(database.data, {
  shouldSort: true,
  threshold: 0.2,
  maxPatternLength: 32,
  keys: ["title", "synonyms"]
});

export const search = (query: string) => {
  const results = fuse.search(query);
  console.log(results.length);
  return results.slice(0, 10);
};
