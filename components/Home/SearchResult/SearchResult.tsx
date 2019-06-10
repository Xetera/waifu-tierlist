import * as React from "react";
import css from "./style.scss";
import { Paper } from "@material-ui/core";

interface Props {
  readonly thumbnail: string;
  readonly title: string;
  readonly episodes: number;
  readonly type: string;
}

export default ({ thumbnail, title, type, episodes }: Props) => {
  return (
    <Paper className={css.container}>
      <div className={css.thumbnailWrapper}>
        <img src={thumbnail} className={css.thumbnail} />
      </div>
      <div className={css.info}>
        <p className={css.text}>{title}</p>
        <div className={css.bottomText}>
          <p className={css.thin}>{type}</p>
          <p className={css.gray}>{episodes} episodes</p>
        </div>
      </div>
    </Paper>
  );
};
