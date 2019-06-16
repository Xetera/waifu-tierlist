import * as React from "react";
import { DebounceInput } from "react-debounce-input";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import css from "./style.scss";
import Box from "@material-ui/core/Box";
import { withMobileDialog } from "@material-ui/core";

interface Props {
  readonly search: (anime: string) => void;
}

export default ({ search }: Props) => {
  const fireChange = (r: React.ChangeEvent<HTMLInputElement>) =>
    search(r.target.value);

  return (
    <Box boxShadow="3" className={css.searchBar}>
      <DebounceInput
        minLength={2}
        onChange={fireChange}
        debounceTimeout={100}
        // @ts-ignore
        element={(props) => (
          <Input
            {...props}
            error
            autoFocus
            className={css.input}
            disableUnderline
            placeholder="Search for an anime..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon
                  color="action"
                  className={css.icon}
                />
              </InputAdornment>
            }
          />
        )}
      />
    </Box>
  );
};
