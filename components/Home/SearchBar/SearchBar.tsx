import * as React from "react";
import { DebounceInput } from "react-debounce-input";
import Input from "@material-ui/core/Input";
import { ReactPropTypes } from "react";

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
      placeholder="Search..."
      // @ts-ignore
      element={Input}
      autoFocus
    />
  );
};
