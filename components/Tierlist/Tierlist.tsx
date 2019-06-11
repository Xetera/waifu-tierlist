import { Anime, Character } from "../../shared/types";
import { CharacterSlider, Navbar, Tier } from ".";
import * as React from "react";
import css from "./style.scss";
import { useDragLayer } from "react-dnd";

interface Props {
  readonly characters: Character[];
  readonly anime: Anime;
}
export default ({ characters, anime }: Props) => {
  useDragLayer(() => ({}));
  console.log(characters);
  return (
    <div className={css.container}>
      <Navbar title={anime.title}/>
      <div className={css.scroller}>
        <Tier name="S" total={characters.length}/>
        <Tier name="A" total={characters.length}/>
        <Tier name="B" total={characters.length}/>
        <Tier name="C" total={characters.length}/>
        <Tier name="D" total={characters.length}/>
        <Tier name="F" total={characters.length}/>
      </div>
      <Tier name="Unranked" characters={characters} total={characters.length} className={css.unranked}/>
    </div>
  );
};
