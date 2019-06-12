import { Role } from "jikants/dist/src/interfaces/manga/Characters";
import { TierName } from "../components/Tierlist/types";

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

export interface Anime {
  sources: string[];
  type: "TV" | "OVA" | "Music" | "Special" | "Movie" | "ONA";
  title: string;
  picture: string;
  relations: string[];
  thumbnail: string;
  episodes?: number;
  synonyms: string[];
}

export interface AnimeDatabase {
  data: Anime[];
}

export interface Character {
  readonly image_url: string;
  readonly mal_id: number;
  readonly name: string;
  readonly role: Role;
  readonly url: string;
  readonly tier?: TierName;
}

export interface CharacterSearchResponse {
  readonly characters: Character[];
  readonly anime: Anime;
}
