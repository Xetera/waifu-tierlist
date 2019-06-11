import { Router } from "express";
import { getAnime, searchAnime } from "./searchAnime";
import { Request, Response } from "express";
import { getAnimeCharacters } from "./characters";
import { endpoints } from "../../shared/http";

/**
 * Helper wrapper object around express routes for
 * dealing with single param actions
 * @param param
 */
const withParam = (param: string) => {
  return (f: (param: string) => object | Promise<object>) => {
    return async (req: Request, res: Response) => {
      try {
        const target = req.params[param];
        const out = await f(target);
        return res.send(out);
      } catch (err) {
        res.status(500);
        return res.send(err);
      }
    };
  };
};

const router = Router();

const sendAnime = withParam("anime");
router.get(endpoints.searchAnime(":anime"), sendAnime(searchAnime));
router.get(endpoints.searchCharacters(":anime"), sendAnime(async (id) => {
  const anime = getAnime(id);
  if (!anime) {
    return Promise.reject({ error: "anime not found" });
  }
  const resp = await getAnimeCharacters(id);
  return {
    characters:  resp || [],
    anime
  }
}));

export default router;
