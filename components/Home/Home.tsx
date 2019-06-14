import * as React from "react";
import css from "./style.scss";
import util from "../../layouts/utility.scss";
import { SavedLists, SearchBar, SearchResult } from ".";
import { extractAnimeId, withToggle } from "../../shared/helpers";
import { get } from "../../shared/http";
import Typography from "@material-ui/core/Typography";
import { Anime } from "../../shared/types";
import Link from "next/link";
import ReactGithubCorner from "react-github-corner";

const generateLinkUrl = (anime: Anime) => {
  const mal = anime.sources.find(source =>
    source.includes("myanimelist")
  ) as string;
  return `tierlist/${extractAnimeId(mal)}`;
};

const NoResults = ({ search }: { search: string }) => (
  <div>
    <p>
      Could find any results for <b>{search}</b>
    </p>
  </div>
);

const SearchPrompt = () => (
  <div className={css.searchPrompt}>
    <p className={util.gray}>You're going to put me on S tier... right?</p>
    <img src="/static/hifumi.png" className={css.hifumiImage} alt="hifumi" />
  </div>
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
    <Link href={generateLinkUrl(anime)} key={anime.title}>
      <a>
        <SearchResult anime={anime} />
      </a>
    </Link>
  ));

  return (
    <div className={css.container}>
      <ReactGithubCorner href="https://github.com/xetera/waifu-tierlist" />
      <div className={css.top}>
        <img src="/static/waifu.jpg" className={css.banner} />
        <div className={css.overlay} />
        <div className={css.topContent}>
          <Typography variant="h2" component="h1" className={css.title}>
            Waifu Tierlist
          </Typography>
          <SearchBar search={onNewAnime} className={css.searchBar} />
        </div>
      </div>
      {/* TODO: fix this bs */}
      {!hasResults && isSearchEmpty && !loading ? (
        <SavedLists saves={saved} />
      ) : (
        <div className={css.resultsContainer}>
          {hasResults
            ? animeResults
            : !isSearchEmpty && !loading && <NoResults search={search} />}
        </div>
      )}
    </div>
  );
};
