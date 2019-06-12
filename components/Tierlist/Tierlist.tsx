import { Anime, Character } from "../../shared/types";
import { CharacterSlider, Navbar, Tier } from ".";
import * as React from "react";
import css from "./style.scss";
import { useDragLayer } from "react-dnd";
import { SavedCharacter, TierName } from "./types";
import CharacterHolder from "./CharacterHolder/CharacterHolder";

interface Props {
  readonly characters: Character[];
  readonly anime: Anime;
}

const tiers: TierName[] = ["S", "A", "B", "C", "D", "F"];
type TierlistState = { [name in TierName]: Character[] };

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

  const onUpdate = (rank: string, chars: SavedCharacter[]) => {
    setRank(prev => ({
      ...prev,
      [rank]: chars
    }));
  };

  useDragLayer(() => ({}));
  console.log(characters);
  return (
    <div className={css.container}>
      <Navbar title={anime.title} />
      <div className={css.scroller}>
        {tiers.map(tier => (
          <Tier name={tier} total={characters.length} update={onUpdate} />
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
