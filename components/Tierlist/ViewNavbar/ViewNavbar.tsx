import { AppBar } from "@material-ui/core";
import base from "../Navbar/style.scss";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import HomeIcon from "@material-ui/icons/Home"
import Button from "@material-ui/core/Button";

interface ViewNavbarProps {
  readonly animeId: string;
  readonly title: string;
}
const ViewNavbar = ({ title, animeId }: ViewNavbarProps) => {
  return (
    <AppBar  position="static" color="default">
      <Toolbar className={base.divider} >
      <div className={[base.section, base.left].join(" ")}>
        <IconButton edge="start" aria-label="Back" href="/">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" className={base.title}>
          {title}
        </Typography>
      </div>
        <div className={base.section}>
          <Button
            color="secondary"
            href={`/tierlist/${animeId}`}
            variant="outlined"
          >
            Make your own
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ViewNavbar;
