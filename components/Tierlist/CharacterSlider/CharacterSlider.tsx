import * as React from "react";
import { Character } from "../../../shared/types";

interface Props {
  readonly characters: Character[];
}

export default ({ characters }: Props) => {
  useDrag
  return (
    <>

      <div>{characters.map(character => character.name)}</div>
    </>
  );
};
