import { Tier } from "../types";
import { useDrop } from "react-dnd";
import css from "./style.scss";
import * as React from "react";
import { DraggableCharacter, types } from "../index";
import { Character } from "../../../shared/types";
import { filterOne } from "../../../shared/helpers";

const getColor = (tier: string) => css[`tier-${tier.toLowerCase()}`];

export default ({ name, total, characters: initialCharacters = [] }: Tier) => {
  const [characters, setCharacters] = React.useState<Character[]>(
    initialCharacters
  );
  const [, drop] = useDrop({
    accept: types.CHARACTER,
    drop: (_, monitor) => setCharacters(prev => [...prev, monitor.getItem()])
  });

  const moveCharacter = (event: Character) => {
    setCharacters(prev =>
      filterOne(char => char.mal_id !== event.mal_id, prev)
    );
  };

  const buildComponent = ({ left }: { left: any }) => (
    <div ref={drop} className={css.tier}>
      {left}
      <div className={css.tierCharacters}>
        {characters.map(char => (
          <DraggableCharacter
            character={char}
            onEnd={moveCharacter}
          />
        ))}
      </div>
    </div>
  );

  if (name === "Unranked") {
    return buildComponent({ left: null });
  }

  return buildComponent({
    left: (
      <span className={[getColor(name), css.tierText].join(" ")}>{name}</span>
    )
  });
};
