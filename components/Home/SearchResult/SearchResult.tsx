import * as React from "react";
import css from "./style.scss";
import { Paper } from "@material-ui/core";
import { Anime } from "../../../shared/types";

interface Props {
  readonly anime: Anime;
}

export default ({ anime }: Props) => {
  return (
    <Paper className={css.container} >
      <div className={css.thumbnailWrapper}>
        <img src={anime.thumbnail} className={css.thumbnail} />
      </div>
      <div className={css.info}>
        <p className={css.text}>{anime.title}</p>
        <div className={css.bottomText}>
          <p className={css.thin}>{anime.type}</p>
          <p className={css.gray}>{anime.episodes} episodes</p>
        </div>
      </div>
    </Paper>
  );
};
