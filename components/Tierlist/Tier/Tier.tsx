import { Tier } from "../types";
import { useDrop } from "react-dnd";
import css from "./style.scss";
import * as React from "react";
import { DraggableCharacter, types } from "../index";
import { Character } from "../../../shared/types";
import { filterOne } from "../../../shared/helpers";
import StaticCharacter from "../StaticCharacter/StaticCharacter";

const getColor = (tier: string) => css[`tier-${tier.toLowerCase()}`];

export default ({
  name,
  className,
  characters: initialCharacters = [],
  update,
  draggable
}: Tier) => {
  const [characters, setCharacters] = React.useState<Character[]>(
    initialCharacters
  );

  React.useEffect(() => {
    update(name, characters);
  }, [characters]);

  const [, drop] = useDrop({
    accept: types.CHARACTER,
    drop: (e, monitor) => {
      console.log(e);
      return setCharacters(prev => [...prev, monitor.getItem()]);
    }
  });

  const moveCharacter = (event?: Character) => {
    if (event) {
      setCharacters(prev =>
        filterOne(char => char.mal_id !== event.mal_id, prev)
      );
    }
  };

  return (
    <div ref={drop} className={[css.tier, className].join(" ")}>
      <span className={[getColor(name), css.tierText].join(" ")}>{name}</span>
      <div className={css.tierCharacters}>
        {characters.map(char =>
          draggable ? (
            <DraggableCharacter
              key={char.mal_id}
              character={char}
              onEnd={moveCharacter}
            />
          ) : (
            <StaticCharacter key={char.mal_id} character={char} />
          )
        )}
      </div>
    </div>
  );
};
