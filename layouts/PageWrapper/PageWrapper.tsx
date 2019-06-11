import * as React from "react";
import css from "./style.scss";
import "../globalStyle.scss";
import { Head } from "..";

export default ({ children, title }: React.PropsWithChildren<{ title?: string }>) => (
  <>
    <Head title={title}/>
    <div className={css.wrapper}>{children}</div>
    <style>{`
      #__next {
        height: 100%;
      }
    `}</style>
  </>
);
