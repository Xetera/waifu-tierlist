import * as React from "react";
import { Character } from "../../../shared/types";
import Favorite from "@material-ui/icons/Favorite";
import css from "./style.scss";
import { Icon } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

interface Props {
  readonly character: Character;
  readonly index: number;
}

const DraggableCharacter = ({ character }: Props) => {
  return (
    <div
      className={[css.character, "item"].join(" ")}
      data-id={character.mal_id}
    >
      <div className="item-content">
        <div>
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
      </div>
    </div>
  );
};
export default DraggableCharacter;
