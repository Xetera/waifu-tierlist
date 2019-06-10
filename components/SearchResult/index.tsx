import * as React from "react";
import css from "./style.css";

interface Props {
  readonly thumbnail: string;
  readonly title: string;
}

export default ({ thumbnail, title }: Props) => {
  return (
    <div className={css.container}>
      <img src={thumbnail} className={css.thumbnail} />
      <p> {title} </p>
    </div>
  );
};
