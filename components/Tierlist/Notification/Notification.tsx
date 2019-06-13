import css from "./style.scss";
import * as React from "react";

const Notification = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={css.notification}
    >
      <div className={css.text}>{children}</div>
    </div>
  );
};

export default Notification;
