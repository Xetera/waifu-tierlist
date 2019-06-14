import { Router } from "express";
import { getAnime, searchAnime } from "./searchAnime";
import { Request, Response } from "express";
import { getAnimeCharacters } from "./characters";
import { endpoints } from "../../shared/http";
import { CharacterSearchResponse, SaveLookupResponse, SavePayload } from "../../shared/types";
import { getSave, save } from "./save";
import { mapObject } from "../../shared/helpers";

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
router.get(
  endpoints.searchCharacters(":anime"),
  sendAnime(async (id: string): Promise<CharacterSearchResponse> => {
    const anime = getAnime(id);
    if (!anime) {
      return Promise.reject({ error: "anime not found" });
    }
    const resp = await getAnimeCharacters(id);
    return {
      characters: resp || [],
      anime
    };
  })
);

router.post(endpoints.save, async (req, res) => {
  const requiredFields = ["anime", "characters"];
  const missingField = requiredFields.some(field => !req.body[field]);
  if (missingField) {
    return res
      .status(400)
      .send({ error: `${missingField} is missing from the body` });
  }
  const payload = req.body as SavePayload;
  const url = await save(payload);
  res.send({ url });
});

const sendSave = withParam("saveId");

router.get(
  endpoints.lookupSave(":saveId"),
  sendSave(async (url): Promise<SaveLookupResponse> => {
    try {
      const { name, animeId, characters } = await getSave(url);
      const rawCharacters = await getAnimeCharacters(animeId);
      const anime = getAnime(animeId);
      if (!anime) {
        return Promise.reject({ error: `Anime recorded as ${animeId} on a save could not be found in the database` });
      }
      const updatedCharacters = mapObject(
        chars =>
          chars.map(char =>
            rawCharacters.find(raw => Number(raw.mal_id) === char)!
          ),
        characters
      );
      return {
        url,
        name,
        characters: updatedCharacters,
        anime: anime,
        animeId
      }
    } catch (e) {
      console.error(e);
      return Promise.reject({ error: "Invalid id" });
    }
  })
);

export default router;
