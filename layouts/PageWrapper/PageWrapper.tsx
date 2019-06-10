import * as React from "react";
import css from "./style.scss";
import { Head } from "..";

export default ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <Head />
    <div className={css.pageWrapper}>{children}</div>
    <style>{`
      #__next {
        height: 100%;
      }
    `}</style>
  </>
);
