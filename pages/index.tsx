import React from "react";
import { Home } from "../components/Home";
import Head from "next/head";
import "../layouts/globalStyle.scss";

export default () => (
  <>
    <Head>
      <title>Waifu Tierlist</title>
    </Head>
    <Home />
  </>
);
