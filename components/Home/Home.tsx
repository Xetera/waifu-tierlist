import * as React from "react";
import css from "./style.scss";
import { SearchBar, SearchResult } from ".";
import { withToggle } from "../../utils/helpers";
import { get } from "../../utils/http";

const NoResults = ({ search }: { search: string }) => (
  <div>
    <p>
      Could find any results for <b>{search}</b>
    </p>
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

  const animeResults = (
    <div className={css.resultsContainer}>
      {animes.map(props => (
        <SearchResult {...props} />
      ))}
    </div>
  );

  return (
    <div className={css.container}>
      <SearchBar search={onNewAnime} className={css.searchBar}/>
      {animes.length > 0
        ? animeResults
        : !isSearchEmpty && !loading && <NoResults search={search} />}
    </div>
  );
};
