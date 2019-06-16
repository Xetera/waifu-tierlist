import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import { withToggle } from "../../../shared/helpers";
import { endpoints } from "../../../shared/http";
import Link from "next/link";
import FileCopy from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const [waiting, setWaiting] = React.useState(false);
  const [completed, setCompleted] = React.useState({
    slideOut: false,
    slideIn: false,
    url: ""
  });

  const updateName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const triggerSave = async () => {
    setWaiting(true);
    const response = await withToggle(() => save(name), setWaiting);
    setCompleted(prev => ({
      ...prev,
      slideOut: true,
      url: `${process.env.API_URL}${endpoints.view(response.url)}`
    }));
    setTimeout(() => setCompleted(prev => ({ ...prev, slideIn: true })), 200);
  };

  return (
    <AppBar position="static" color="default">
      <Dialog
        open={open}
        TransitionComponent={Transition as any}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Save & Share</DialogTitle>
        <DialogContent className={css.dialogueBody}>
          <DialogContentText>
            Save and share your current list with your friends.
          </DialogContentText>
          {!completed.slideIn && (
            <Slide direction="right" in={!completed.slideOut}>
              <TextField
                label="Username"
                variant="outlined"
                inputProps={{
                  maxLength: 32
                }}
                autoFocus
                fullWidth={true}
                onChange={updateName}
              />
            </Slide>
          )}
          {completed.slideIn && (
            <Slide direction="left" in={completed.slideIn}>
              <div className={css.clipboardSlider}>
                <CopyToClipboard text={completed.url}>
                  <IconButton>
                    <FileCopy />
                  </IconButton>
                </CopyToClipboard>
                <Link>
                  <a href={completed.url} className={css.linkText}>
                    {completed.url}
                  </a>
                </Link>
              </div>
            </Slide>
          )}
        </DialogContent>
        <DialogActions className={css.actionsOverride}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={triggerSave}
            disabled={waiting || completed.slideOut || completed.slideIn}
          >
            Get link
            {!waiting && <LinkIcon className={css.linkIcon} />}
            {waiting && <CircularProgress size={20} className={css.linkIcon} />}
          </Button>
        </DialogActions>
      </Dialog>
      <Toolbar className={css.divider}>
        <div className={[css.section, css.left].join(" ")}>
          <IconButton edge="start" aria-label="Back" href="/">
            <HomeIcon />
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
