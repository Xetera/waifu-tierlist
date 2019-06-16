import * as React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import css from "./style.scss";
import Box from "@material-ui/core/Box";
import debounce from "lodash/debounce";
import { useEffect } from "react";

interface Props {
  readonly search: (anime: string) => void;
}

export default ({ search }: Props) => {
  const fireChange = (r: React.ChangeEvent<HTMLInputElement>) =>  {
    search(r.target.value)
  };

  const debouncedChange = debounce(fireChange, 200);

  const onChange = (r: React.ChangeEvent<HTMLInputElement>) => {
    r.persist();
    debouncedChange(r);
  };

  useEffect(() => {
    return debouncedChange.cancel;
  }, []);

  return (
    <Box boxShadow="3" className={css.searchBar}>
      <Input
        error
        onChange={onChange}
        autoFocus
        className={css.input}
        disableUnderline
        placeholder="Search for an anime..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="action" className={css.icon} />
          </InputAdornment>
        }
      />
    </Box>
  );
};
