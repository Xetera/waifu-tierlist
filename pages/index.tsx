import React from "react";
import { get } from "../utils/http";
import { DebounceInput } from "react-debounce-input";

export default () => {
  const [animes, setAnimes] = React.useState([]);

  const e = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "") {
      return;
    }
    const { value } = evt.target;
    console.log(value);
    const response = await get(`/mal/search/${value}`);
    console.log(response);
    setAnimes(response);
  };

  return (
    <>
      <DebounceInput minLength={2} debounceTimeout={100} onChange={e} />
      {animes.map((e: any) => (
        <div style={{ display: "flex" }}>
          <img src={e.thumbnail} />
          <p>{e.title}</p>
        </div>
      ))}
    </>
  );
};
