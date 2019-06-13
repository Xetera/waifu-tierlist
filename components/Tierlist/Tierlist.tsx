import { Navbar, Tier } from ".";
import * as React from "react";
import css from "./style.scss";
import { useDragLayer } from "react-dnd";
import CharacterHolder from "./CharacterHolder/CharacterHolder";
import { TierName } from "./types";
import { Anime, Character, TierlistState } from "../../shared/types";
import { endpoints } from "../../shared/http";
import { extractAnimeId, mapObject } from "../../shared/helpers";

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

export default ({ characters, anime, draggable = true }: Props) => {
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

  const onUpdate = (rank: string, chars: Character[]) => {
    setRank(prev => ({
      ...prev,
      [rank]: chars
    }));
  };

  const save = async (name: string) => {
    // this can't fail
    const animeSource = anime.sources.find(source =>
      source.includes("myanimelist")
    )!;
    const req = await fetch(endpoints.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        characters: mapObject(chars => chars.map(char => char.mal_id), ranks),
        // we can't send anything tha
        anime: extractAnimeId(animeSource)
      })
    });
    const res = await req.json();
    console.log(res);
    return res;
  };

  useDragLayer(() => ({}));

  const makeTier = (tier: TierName, characters: Character[]) => (
    <Tier name={tier} total={characters.length} update={onUpdate} key={tier} draggable={draggable}/>
  );
  return (
    <div className={css.container}>
      <Navbar title={anime.title} save={save} />
      <div className={css.scroller}>
        {TIERS.map(tier => makeTier(tier, ranks[tier]))}
      </div>
      <CharacterHolder
        characters={characters}
        total={characters.length}
        update={onUpdate}
      />
    </div>
  );
};
