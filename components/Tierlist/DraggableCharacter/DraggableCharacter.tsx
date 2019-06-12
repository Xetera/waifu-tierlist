import * as React from "react";
import { Character } from "../../../shared/types";
import { useDrag } from "react-dnd";
import { types } from "../index";
import Favorite from "@material-ui/icons/Favorite";
import css from "./style.scss";
import { Icon } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

interface Props<T> {
  readonly character: Character;
  readonly begin: any;
  readonly onEnd: (payload: T | undefined) => void;
}

export default ({ character, onEnd, begin }: Props<Character>) => {
  const [, drag] = useDrag({
    item: { id: character.mal_id, type: types.CHARACTER, ...character },
    end: onEnd,
    begin
  });
  return (
    <div ref={drag} className={css.character}>
      {/*<DragPreviewImage src={character.image_url}/>*/}
      <img
        className={css.characterImage}
        src={character.image_url}
        alt="character"
      />
      {character.role === "Main" && (
        <Icon fontSize="small" color="inherit">
          <Tooltip title="Main character">
            <Favorite className={css.favorite} scale={0.1} />
          </Tooltip>
        </Icon>
      )}
      <div className={css.name}>{character.name}</div>
    </div>
  );
};
