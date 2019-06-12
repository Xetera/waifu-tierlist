import { Navbar, Tier } from ".";
import * as React from "react";
import css from "./style.scss";
import { useDragLayer } from "react-dnd";
import CharacterHolder from "./CharacterHolder/CharacterHolder";
import { TierName } from "./types";
import { Anime, Character, TierlistState } from "../../shared/types";
import { endpoints } from "../../shared/http";

export const TIERS: TierName[] = ["S", "A", "B", "C", "D", "F"];
interface Props {
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

export default ({ characters, anime }: Props) => {
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

  const onUpdate = (rank: string, chars: number[]) => {
    setRank(prev => ({
      ...prev,
      [rank]: chars
    }));
  };

  const save = async (name: string) => {
    console.log(name);
    console.log(ranks);
    const req = await fetch(endpoints.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        characters: ranks
      })
    });
    const res = await req.json();
    console.log(res);
  };

  useDragLayer(() => ({}));
  return (
    <div className={css.container}>
      <Navbar title={anime.title} save={save} />
      <div className={css.scroller}>
        {TIERS.map(tier => (
          <Tier
            name={tier}
            total={characters.length}
            update={onUpdate}
            key={tier}
          />
        ))}
      </div>
      <CharacterHolder
        characters={characters}
        total={characters.length}
        update={onUpdate}
      />
    </div>
  );
};
