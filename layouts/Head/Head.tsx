import * as React from "react";
import Head from "next/head";
import { HeadProps } from "../index";

const defaults = {
  title: "Waifu Tierlist",
  url: "https://waifu.hifumi.io",
  description:
    "Waifu tierlist maker, generate tier lists of the characters in your favorite anime"
};

export default ({ title, description, image, url }: HeadProps) => (
  <Head>
    <title>{title || defaults.title}</title>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="initial-scale=1.0, width=device-width"
      key="viewport"
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title || defaults.title} />
    <meta name="og:site_name" content="Waifu Tierlist" />
    <meta name="description" content={description || defaults.description} />
    <meta name="og:description" content={description || defaults.description} />
    <meta name="og:url" content={url || defaults.url} />
    {image && <meta name="og:image" content={image} />}
    {url || (!title && <link rel="canonical" href={url || defaults.title} />)}
    <link rel="icon" type="image/png" href="/static/favicon_small.png" />
    <link rel="manifest" href="/static/manifest.json" />
    <meta name="theme-color" content="#b748b5" />
    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
  </Head>
);
