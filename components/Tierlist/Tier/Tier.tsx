import { Tier } from "../types";
import { useDrop } from "react-dnd";
import css from "./style.scss";
import * as React from "react";
import { DraggableCharacter, types } from "../index";
import { Character } from "../../../shared/types";
import { filterOne } from "../../../shared/helpers";

const getColor = (tier: string) => css[`tier-${tier.toLowerCase()}`];

export default ({
  name,
  className,
  characters: initialCharacters = [],
  update
}: Tier) => {
  const [characters, setCharacters] = React.useState<Character[]>(
    initialCharacters
  );

  React.useEffect(() => {
    update(name, characters.map(char => char.mal_id));
  }, [characters]);

  const [, drop] = useDrop({
    accept: types.CHARACTER,
    drop: (e, monitor) => {
      console.log(e);
      return setCharacters(prev => [...prev, monitor.getItem()]);
    }
    // canDrop: (_, monitor) => {
    //   const item: Character = monitor.getItem();
    //   return characters.every(char => char.mal_id !== item.mal_id);
    // }
  });

  const moveCharacter = (event?: Character) => {
    if (event) {
      setCharacters(prev =>
        filterOne(char => char.mal_id !== event.mal_id, prev)
      );
    }
  };

  const pickUpCharacter = (e: any) => {
    console.log(e);
  };

  return (
    <div ref={drop} className={[css.tier, className].join(" ")}>
      {name !== "Unranked" && (
        <span className={[getColor(name), css.tierText].join(" ")}>{name}</span>
      )}
      <div className={css.tierCharacters}>
        {characters.map(char => (
          <DraggableCharacter
            key={char.mal_id}
            character={char}
            begin={pickUpCharacter}
            onEnd={moveCharacter}
          />
        ))}
      </div>
    </div>
  );
};
