import { SavePayload } from "../../shared/types";
import { ISavedList, SavedList } from "../models/savedList";
import { getAnime } from "./searchAnime";
import { MAX_CHAR_COUNT } from "../../shared/helpers";

export const save = async ({ anime, characters, name }: SavePayload) => {
  try {
    console.log(`Saving tierlist from ${name}`);

    const animeResult = getAnime(anime);
    if (!animeResult) {
      return Promise.reject("Invalid anime ID")
    }
    const list = new SavedList({
      animeName: animeResult.title,
      animeId: anime,
      name: name ? name.slice(0, MAX_CHAR_COUNT) : "",
      characters
    });
    const { url } = await list.save();
    return url;
  } catch (e) {
    console.error(`Error saving ${name}'s list`);
    console.error(characters);
    return Promise.reject("Could not save user's list");
  }
};

export const getSave = (url: string): Promise<ISavedList> =>
  SavedList.findOne({
    url
  }).then(async res => {
    if (!res) {
      return Promise.reject("invalid url");
    }
    return res;
  });
