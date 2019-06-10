import * as React from "react";
import { DebounceInput } from "react-debounce-input";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search"

interface Props  {
  readonly className?: string;
  readonly search: (anime: string) => void;
}

export default ({ search, className }: Props) => {
  const fireChange = (r: React.ChangeEvent<HTMLInputElement>) =>
    search(r.target.value);

  return (
    <DebounceInput
      className={className}
      minLength={2}
      debounceTimeout={100}
      onChange={fireChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      placeholder="Search for an anime..."
      // @ts-ignore
      element={Input}
      autoFocus
    />
  );
};
