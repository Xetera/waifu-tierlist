import J from "jikants";
import { Character } from "../../shared/types";

export const getAnimeCharacters = (id: string | number): Promise<Partial<Character[]>> =>
  J.Anime.charactersStaff(Number(id)).then(res => {
    if (!res) {
      return [];
    }
    return res.characters.map(({ voice_actors, ...rest }) => rest);
  });
