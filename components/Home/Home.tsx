import * as React from "react";
import css from "./style.scss";
import { SavedLists, SearchBar, SearchResult } from ".";
import { extractAnimeId, withToggle } from "../../shared/helpers";
import { get } from "../../shared/http";
import Typography from "@material-ui/core/Typography";
import { Anime } from "../../shared/types";
import Link from "next/link";
import ReactGithubCorner from "react-github-corner";
import Title from "./Title/Title";
import Results from "./Results/Results";
import GithubCorner from "react-github-corner";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const NoResults = () => (
  <Typography className={css.noResultContainer}>
    <Box fontWeight={200} textAlign="center" className={css.divider}>
      Could find any results for that :(
    </Box>
    <video src="/static/cry.mp4" autoPlay loop className={css.noResults} />
  </Typography>
);

export default () => {
  const [animes, setAnimes] = React.useState<Anime[]>([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [saved, setSaved] = React.useState([]);

  React.useEffect(() => {
    setSaved(JSON.parse(localStorage.getItem("saves") || "[]"));
  }, []);

  const onNewAnime = async (value: string) => {
    setSearch(value);
    if (value === "") {
      return setAnimes([]);
    }
    const response = await withToggle(
      () => get(`/mal/search/${value}`),
      setLoading
    );
    setAnimes(response);
  };

  const isSearchEmpty = search === "";
  const hasResults = animes.length > 0;

  const animeResults = animes.map(anime => (
    // {/*<a href={generateLinkUrl(anime)} key={anime.title} className={css.searchCover}>*/}
      <SearchResult anime={anime} />
    // </a>
  ));

  return (
    <div className={css.container}>
      <GithubCorner
        href="https://github.com/xetera/waifu-tierlist"
        className={css.github}
        size="50px"
      />
      <div className={css.top}>
        <div className={css.banner} />
        <div className={css.topContent}>
          <Title />
        </div>
      </div>
      <div className={css.content}>
        <SearchBar search={onNewAnime} />
        {/*/!* TODO: fix this bs *!/*/}
        {!hasResults && isSearchEmpty && !loading ? (
          <>
            <Box className={css.divider}>or</Box>
            <Button
              variant="outlined"
              className={css.customButton}
              disabled={true}
              href="/custom"
              color="default"
            >
              Rank your favorite waifus
            </Button>
            <Typography color="textSecondary" className={css.disclaimer}>
              <Box style={{ marginTop: "20px" }}>
                Custom waifu-ranking feature coming very soon!
              </Box>
            </Typography>
            {/*<Results*/}
            {/*  className={css.gridResult}*/}
            {/*  left="Your previous lists"*/}
            {/*  right={`${saved.length} saves`}*/}
            {/*>*/}
            {/*  {saved.map(save => (*/}
            {/*    <SavedLists save={save}/>*/}
            {/*  ))}*/}
            {/*</Results>*/}
          </>
        ) : !loading && !hasResults ? (
          <Results>
            <NoResults />
          </Results>
        ) : (
          <Results
            right={`${animeResults.length || "No"} results`}
            left="Animes found"
            className={css.gridResult}
          >
            {animeResults}
          </Results>
        )}
      </div>
    </div>
  );
};
