import * as React from "react";
import { PageWrapper } from "../layouts";
import { endpoints, get } from "../shared/http";
import {
  Anime,
  Character,
  CharacterSearchResponse,
  InitialProps
} from "../shared/types";
import Tierlist from "../components/Tierlist/Tierlist";

interface Props {
  readonly id: number;
  readonly characters: Character[];
  readonly anime: Anime;
}

const TierlistView = ({ characters, anime, id }: Props) => {
  return (
    <PageWrapper
      title={`Tierlist | ${anime.title}`}
      description={`Generate a tier list of all the characters in ${
        anime.title
      }`}
      image={anime.picture}
      url={`https://waifu.hifumi.io/tierlist/${id}`}
    >
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
export default TierlistView;
