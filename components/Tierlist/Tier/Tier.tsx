import { Tier } from "../types";
import { useDrop } from "react-dnd";
import css from "./style.scss";
import * as React from "react";
import { DraggableCharacter, types } from "../index";
import { Character } from "../../../shared/types";
import { filterOne } from "../../../shared/helpers";

const getColor = (tier: string) => css[`tier-${tier.toLowerCase()}`];

export default ({ name, className, characters: initialCharacters = [] }: Tier) => {
  const [characters, setCharacters] = React.useState<Character[]>(
    initialCharacters
  );
  const [, drop] = useDrop({
    accept: types.CHARACTER,
    drop: (_, monitor) => setCharacters(prev => [...prev, monitor.getItem()])
  });

  const moveCharacter = (event?: Character) => {
    if (event) {
      setCharacters(prev =>
        filterOne(char => char.mal_id !== event.mal_id, prev)
      );
    }
  };

  const buildComponent = ({ left }: { left: any }) => (
    <div ref={drop} className={[css.tier, className].join(' ')}>
      {left}
      <div className={css.tierCharacters}>
        {characters.map(char => (
          <DraggableCharacter
            key={char.mal_id}
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
