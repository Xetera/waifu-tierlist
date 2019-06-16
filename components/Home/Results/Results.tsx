import * as React from "react";
import css from "./style.scss";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface Props {
  readonly right?: string;
  readonly left?: string;
  readonly className?: string;
}

const Results = ({
  children,
  right,
  left,
  className
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={css.container}>
      {left && right && (
        <Typography className={css.labels} component="div">
          {left && <Box className={css.label}>{left}</Box>}
          {right && <Box className={css.label}>{right}</Box>}
        </Typography>
      )}
      <div className={className}>{children}</div>
    </div>
  );
};

export default Results;
