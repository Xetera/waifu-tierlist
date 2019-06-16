import { Navbar, Tier } from ".";
import * as React from "react";
import css from "./style.scss";
import CharacterHolder from "./CharacterHolder/CharacterHolder";
import { TierName } from "./types";
import { Anime, Character, TierlistState } from "../../shared/types";
import { endpoints } from "../../shared/http";
import { extractAnimeId, mapObject, muuris } from "../../shared/helpers";

export const TIERS: TierName[] = ["S", "A", "B", "C", "D", "F"];
interface Props {
  readonly draggable: boolean;
  readonly characters: Character[];
  readonly anime: Anime;
}

const initialState: TierlistState = {
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
  F: [],
  Unranked: []
};

const Tierlist = ({ characters, anime, draggable = true }: Props) => {
  const [ranks, setRank] = React.useState<TierlistState>(
    characters.reduce((all, char) => {
      const tier = char.tier || "Unranked";
      const currentState = all[tier];
      return {
        ...all,
        [tier]: [...currentState, char]
      };
    }, initialState)
  );

  const save = async (name: string) => {
    // this can't fail
    const animeSource = anime.sources.find(source =>
      source.includes("myanimelist")
    )!;
    const characters = mapObject(
          (muuri: any) => muuri._items.map((char: any) => Number(char._element.dataset.id)),
          muuris
        );

    const req = await fetch(endpoints.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        characters,
        // we can't send anything tha
        anime: extractAnimeId(animeSource)
      })
    });
    const res = await req.json();
    return res;
  };

  const makeTier = (tier: TierName, characters: Character[]) => (
    <Tier
      name={tier}
      characters={ranks[tier]}
      total={characters.length}
      key={tier}
      draggable={draggable}
    />
  );

  return (
    <div className={css.container}>
      <Navbar title={anime.title} save={save} />
      <div className={css.scroller}>
        {TIERS.map(tier => makeTier(tier, ranks[tier]))}
      </div>
      <CharacterHolder characters={ranks["Unranked"]} />
    </div>
  );
};

export default Tierlist;
