import * as React from "react";
import css from "./style.scss";
import util from "../../layouts/utility.scss";
import { SearchBar, SearchResult } from ".";
import { withToggle } from "../../utils/helpers";
import { get } from "../../utils/http";
import hifumi from "../../assets/hifumi.png";
import Typography from "@material-ui/core/Typography";

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
    <img src={hifumi} className={css.hifumiImage} />
  </div>
);

export default () => {
  const [animes, setAnimes] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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

  const animeResults = animes.map(props => <SearchResult {...props} />);

  return (
    <div className={css.container}>
      <Typography variant="h2" component="h1" className={css.title}>
        Waifu Tierlist
      </Typography>
      <SearchBar search={onNewAnime} className={css.searchBar} />
      {!hasResults && isSearchEmpty && !loading ? (
        <SearchPrompt />
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
