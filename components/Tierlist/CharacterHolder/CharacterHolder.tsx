import * as React from "react";
import { Character } from "../../../shared/types";
import { DraggableCharacter, types } from "../index";
import { filterOne, muuris, Muuris } from "../../../shared/helpers";
import css from "./style.scss";
import { Collapse } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { useEffect } from "react";

interface CharacterHolder {
  readonly characters: Character[];
}

/**
 * Yes I know this class a duplicate of Tier, but I can't
 * be bothered to extract the logic to a parent component
 * also because I don't know how that works with react
 * @param initialCharacters
 * @param update
 */
const CharacterHolder = ({ characters }: CharacterHolder) => {
  React.useEffect(() => {
    const Muuri = require("muuri");
    const grid = new Muuri(".character-holder", {
      dragEnabled: true,
      dragContainer: document.body,
      dragSort: () => Object.values(muuris)
    });
    muuris.Unranked = grid;
  }, []);
  const [isOpen, setOpen] = React.useState(true);

  return (
    <div className={css.tier}>
      <Collapse in={isOpen} className={css.collapse}>
        <div className={[css.tierCharacters, "character-holder"].join(" ")}>
          {characters.map((char, idx) => (
            <DraggableCharacter
              key={char.mal_id}
              character={char}
              index={idx}
            />
          ))}
        </div>
      </Collapse>
      <BottomNavigation showLabels className={css.bottomDrawer} color="red">
        <BottomNavigationAction
          label={isOpen ? "Hide Characters" : `Show Characters`}
          icon={isOpen ? <ArrowDown /> : <ArrowUp />}
          onClick={() => setOpen(!isOpen)}
        />
      </BottomNavigation>
    </div>
  );
};
export default CharacterHolder;