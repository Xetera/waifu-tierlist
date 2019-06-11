import * as React from "react";
import css from "./style.scss";
import "../globalStyle.scss";
import { Head, HeadProps } from "..";

export default ({ children, ...all }: React.PropsWithChildren<HeadProps>) => (
  <>
    <Head {...all}/>
    <div className={css.wrapper}>{children}</div>
    <style>{`
      #__next {
        height: 100%;
      }
    `}</style>
  </>
);
