import * as React from "react";
import { Save } from "../index";
import Box from "@material-ui/core/Box";
import css from "./style.scss";
import { Typography } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

const SavedLists = ({ saves }: { saves: Save[] }) => {
  return (
    <div className={css.save}>
      <Typography variant="h2">
        Your lists
      </Typography>
      {saves.map(save => (
        <Card key={save.url} component="div">
          <CardContent>
            <Typography variant="h3" color="textPrimary">
              {save.name}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton>
              <ListIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default SavedLists;
