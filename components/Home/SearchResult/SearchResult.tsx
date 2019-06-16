import * as React from "react";
import css from "./style.scss";
import { Paper } from "@material-ui/core";
import { Anime } from "../../../shared/types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import { extractAnimeId } from "../../../shared/helpers";

interface Props {
  readonly anime: Anime;
}

const mappings = [
  ["myanimelist.net", "/static/mal.png"],
  ["anilist.co", "/static/anilist.png"],
  ["kitsu.io", "/static/kitsu.png"]
];

const toIconElem = (link: string) => {
  const found = mappings.find(([fragment]) => link.includes(fragment));
  if (!found) {
    return null;
  }
  const [, href] = found;

  return (
    <a target="_blank" rel="noreferrer noopener" href={link}>
      <img src={href} className={css.icon} alt="icon" />
    </a>
  );
};
const generateLinkUrl = (anime: Anime) => {
  const mal = anime.sources.find(source =>
    source.includes("myanimelist")
  ) as string;
  return `tierlist/${extractAnimeId(mal)}`;
};

export default ({ anime }: Props) => {
  return (
    <Paper elevation={3}>
      <a href={generateLinkUrl(anime)} className={css.container} >
        <div className={css.thumbnailWrapper}>
          <img src={anime.picture} className={css.thumbnail} />
        </div>
        <div className={css.info}>
          <Typography component="div" className={css.top}>
            <Box className={css.title}>{anime.title}</Box>
            <Box className={css.type}>{anime.type}</Box>
          </Typography>
          <Typography className={css.bottom}>
            <Box className={css.episodes}>
              {anime.episodes || "Unknown"} episode
              {anime.episodes ? anime.episodes > 1 && "s" : ""}
            </Box>
            <div className={css.icons}>
              {anime.sources.reduce(
                (all, source) => {
                  const result = toIconElem(source);
                  if (!result) {
                    return all;
                  }
                  return [...all, result];
                },
                [] as JSX.Element[]
              )}
            </div>
          </Typography>
        </div>
      </a>
    </Paper>
  );
};
