import { Router } from "express";
import { searchAnime } from "./searchAnime";
import { Request, Response } from "express";
import { getAnimeCharacters } from "./characters";
import { endpoints } from "../../shared/http";
const router = Router();

/**
 * Helper wrapper object around express routes for
 * dealing with single param actions
 * @param param
 */
const withParam = (param: string) => {
  return (f: (param: string) => object | Promise<object>) => {
    return async (req: Request, res: Response) => {
      const target = req.params[param];
      const out = await f(target);
      res.send(out);
    };
  };
};

const sendAnime = withParam("anime");

router.get(endpoints.searchAnime(":anime"), sendAnime(searchAnime));

router.get(endpoints.searchCharacters(":anime"), sendAnime(getAnimeCharacters));

export default router;
