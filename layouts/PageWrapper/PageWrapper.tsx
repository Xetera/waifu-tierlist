import * as React from "react";
import css from "./style.scss";

export default ({ children }: React.PropsWithChildren<{}>) => (
  <div className={css.pageWrapper}>{children}</div>
);
