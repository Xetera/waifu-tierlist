import * as React from "react";
import { Save } from "../index";
import Box from "@material-ui/core/Box";
import css from "./style.scss";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

const SavedLists = ({ save }: { save: Save }) => {
  return (
    <Card key={save.url} component="div">
      <CardContent>
        <Typography variant="h3" color="textPrimary">
          <Box m={1} fontSize="18px">
            {save.name}
          </Box>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <ListIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SavedLists;
