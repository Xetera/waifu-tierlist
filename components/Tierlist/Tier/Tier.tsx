import { Tier as TierType } from "../types";
import css from "./style.scss";
import * as React from "react";
import { DraggableCharacter } from "../index";
import { Character } from "../../../shared/types";
import StaticCharacter from "../StaticCharacter/StaticCharacter";
import { muuris, Muuris } from "../../../shared/helpers";
import { Simulate } from "react-dom/test-utils";

const getColor = (tier: string) => css[`tier-${tier.toLowerCase()}`];

const Tier = ({ name, className, characters, draggable }: TierType) => {
  React.useEffect(() => {
    if (!draggable) {
      return;
    }
    const Muuri = require("muuri");
    const grid = new Muuri(`.${name}`, {
      dragEnabled: true,
      dragContainer: document.body,
      dragSort: () => Object.values(muuris)
    });
    muuris[name] = grid;
  }, []);
  return (
    <div className={css.tier}>
      <span className={[getColor(name), css.tierText].join(" ")}>{name}</span>
        <div className={[css.tierCharacters, name, !draggable && css.static].join(" ")}>
          {characters.map((char, idx) =>
            draggable ? (
              <DraggableCharacter
                index={idx}
                key={char.mal_id}
                character={char}
              />
            ) : (
              <StaticCharacter key={char.mal_id} character={char} />
            )
          )}
        </div>
    </div>
  );
};

export default Tier;
