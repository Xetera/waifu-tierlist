import * as React from "react";
import { PageWrapper } from "../layouts";
import { endpoints, get } from "../shared/http";
import {
  Anime,
  Character,
  CharacterSearchResponse,
  InitialProps
} from "../shared/types";
import { DragDropContext } from "react-dnd";
import MultiBackend, { Preview } from "react-dnd-multi-backend";
import Tierlist from "../components/Tierlist/Tierlist";
import { createDnDContext } from "../shared/helpers";

interface Props {
  readonly id: number;
  readonly characters: Character[];
  readonly anime: Anime;
}

const TierlistView = ({ characters, anime, id }: Props) => {
  const generatePreview = (
    _type: string,
    item: Character,
    style: React.CSSProperties
  ) => {
    const additional = { height: "50px", zIndex: 5 };
    const newStyle = { ...style, ...additional };
    return (
      <div style={newStyle}>
        <img src={item.image_url} style={{ height: "100px" }} alt="preview" />
      </div>
    );
  };
  return (
    <PageWrapper
      title={`Tierlist | ${anime.title}`}
      description={`Generate a tier list of all the characters in ${
        anime.title
      }`}
      image={anime.picture}
      url={`https://waifu.hifumi.io/tierlist/${id}`}
    >
      <Preview generator={generatePreview} />
      <Tierlist characters={characters} anime={anime} draggable={true} />
    </PageWrapper>
  );
};

TierlistView.getInitialProps = async ({ query }: InitialProps) => {
  const { id } = query;
  const { characters, anime } = (await get(
    endpoints.searchCharacters(id)
  )) as CharacterSearchResponse;
  return { characters, anime, id };
};
export default createDnDContext(TierlistView);
