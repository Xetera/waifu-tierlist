import * as React from "react";
import Head from "next/head";

interface Props {
  readonly title?: string;
}

export default ({ title }: Props) => (
  <Head>
    <title>{ title || "Waifu Tierlist" }</title>
    <meta
      name="viewport"
      content="initial-scale=1.0, width=device-width"
      key="viewport"
    />
    <link rel="icon" type="image/png" href="/static/favicon.png" />
    <link rel="manifest" href="/static/manifest.json" />
    <meta name="theme-color" content="#b748b5" />
  </Head>
)
