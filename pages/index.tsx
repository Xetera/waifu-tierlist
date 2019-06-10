import React from "react";

export default () => {
  const [search, setSearch] = React.useState("");

  const e = (t: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(t.target.value);

  return (
    <>
      <input onChange={e} />
    </>
  );
};
