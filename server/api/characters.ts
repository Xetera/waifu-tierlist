import J from "jikants";

export const getAnimeCharacters = (id: string | number) =>
  J.Anime.charactersStaff(Number(id));
