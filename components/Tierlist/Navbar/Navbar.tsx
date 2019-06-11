import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import { Typography } from "@material-ui/core";
import css from "./style.scss";
import Dialog from "@material-ui/core/Dialog";
import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "react-transition-group/Transition";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ title }: { title: string }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <AppBar position="static" color="default">
      <Dialog
        open={open}
        TransitionComponent={Transition as any}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Save your list</DialogTitle>
        <DialogContent>
          <DialogContentText>Saving is coming very soon!</DialogContentText>
        </DialogContent>
      </Dialog>
      <Toolbar className={css.divider}>
        <div className={[css.section, css.left].join(" ")}>
          <IconButton edge="start" aria-label="Back" href="/">
            <BackIcon />
          </IconButton>
          <Typography variant="h6" className={css.title}>{title}</Typography>
        </div>
        <div className={css.section}>
          <Button color="primary" href="#" variant="contained" onClick={() => setOpen(true)}>
            Save & Share
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
