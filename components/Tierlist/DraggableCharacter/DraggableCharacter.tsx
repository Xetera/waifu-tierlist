import * as React from "react";
import { Character } from "../../../shared/types";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { types } from "../index";
import css from "./style.scss";

interface Props<T> {
  readonly character: Character;
  readonly onEnd: (payload: T | undefined) => void;
}
export default ({ character, onEnd }: Props<Character>) => {
  const [, drag] = useDrag({
    item: { id: character.mal_id, type: types.CHARACTER, ...character },
    end: onEnd
  });
  return (
    <div ref={drag} className={css.character}>
      {/*<DragPreviewImage src={character.image_url}/>*/}
      <img
        className={css.characterImage}
        src={character.image_url}
        alt="character"
      />
        <div className={css.name}>{character.name}</div>
    </div>
  );
};
