import { Role } from "jikants/dist/src/interfaces/manga/Characters";

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
}
