import { Role } from "jikants/dist/src/interfaces/manga/Characters";
import { TierName } from "../components/Tierlist/types";

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

export interface SaveLookupResponse {
  readonly name: string;
  readonly url: string;
  readonly characters: Record<string, Character[]>;
  readonly anime: Anime;
  readonly animeId: string;
}

export type TierlistState<T = Character[]> = { [name in TierName]: T };

export interface SavePayload {
  readonly name?: string;
  readonly characters: TierlistState;
  readonly anime: string;
}

export interface InitialProps {
  readonly query: {
    readonly id: string;
  };
}
