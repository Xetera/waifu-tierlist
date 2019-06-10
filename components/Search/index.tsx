import * as React from "react";
import { get } from "../../utils/http";
import { DebounceInput } from "react-debounce-input";
import { withToggle } from "../../utils/helpers";
import Input from "@material-ui/core/Input";
import css from "./style.scss";
import SearchResult from "components/SearchResult";

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

  const e = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
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

  const animeResults = animes.map(({ thumbnail, title }) => (
    <SearchResult thumbnail={thumbnail} title={title} />
  ));

  return (
    <>
      <DebounceInput
        minLength={2}
        debounceTimeout={100}
        onChange={e}
        placeholder="Search..."
        // @ts-ignore
        element={Input}
      />
      {animes.length > 0
        ? animeResults
        : !isSearchEmpty && !loading && <NoResults search={search} />}
    </>
  );
};
