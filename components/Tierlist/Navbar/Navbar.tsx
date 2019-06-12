import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
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
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import LinkIcon from "@material-ui/icons/Link";

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  readonly save: (name: string) => void;
  readonly title: string;
}

export default ({ title, save }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const updateName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const triggerSave = () => save(name);

  return (
    <AppBar position="static" color="default">
      <Dialog
        open={open}
        TransitionComponent={Transition as any}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Save & Share</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Save and share your current list with your friends. Enter a username
            if you want.
          </DialogContentText>
          <TextField
            label="Username"
            variant="outlined"
            margin="dense"
            inputProps={{
              maxLength: 32
            }}
            autoFocus
            fullWidth={true}
            onChange={updateName}
          />
        </DialogContent>
        <DialogActions className={css.actionsOverride}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={triggerSave}
            href="#"
          >
            Get link
            <LinkIcon className={css.linkIcon} />
          </Button>
        </DialogActions>
      </Dialog>
      <Toolbar className={css.divider}>
        <div className={[css.section, css.left].join(" ")}>
          <IconButton edge="start" aria-label="Back" href="/">
            <BackIcon />
          </IconButton>
          <Typography variant="h6" className={css.title}>
            {title}
          </Typography>
        </div>
        <div className={css.section}>
          <Button
            color="inherit"
            href="#"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Save & Share
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
