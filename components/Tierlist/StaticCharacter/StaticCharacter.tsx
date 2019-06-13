import css from "../DraggableCharacter/style.scss";
import { Icon } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { Favorite } from "@material-ui/icons";
import { Character } from "../../../shared/types";
export default ({ character }: { character: Character }) => {
  return (
    <div className={css.character}>
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
