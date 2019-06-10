import React from "react";
import { Home } from "../components/Home/index";
import "../layouts/globalStyle.scss";
import { PageWrapper, Head } from "../layouts";

export default () => (
  <>
    <Head />
    <PageWrapper >
      <Home />
    </PageWrapper>
    <style>{`
      #__next {
        height: 100%;
      }
    `}</style>
  </>
);
