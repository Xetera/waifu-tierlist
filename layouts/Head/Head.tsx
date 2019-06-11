import * as React from "react";
import Head from "next/head";

interface Props {
  readonly title?: string;
  readonly image?: string;
  readonly url?: string;
  readonly description?: string;
}
const defaults = {
  title: "Waifu Tierlist",
  url: "https://waifu.hifumi.io",
  description:
    "Waifu tierlist maker, generate tier lists of the characters in your favorite anime"
};

export default ({ title, description, image, url }: Props) => (
  <Head>
    <title>{title || defaults.title}</title>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="initial-scale=1.0, width=device-width"
      key="viewport"
    />
    <meta property="og:type" content="website" />
    <meta name="og:site_name" content="Waifu Tierlist" />
    <meta name="description" content={description || defaults.description} />
    <meta name="og:description" content={description || defaults.description} />
    <meta name="og:url" content={url || defaults.url} />
    {image && <meta name="og:image" content={image} />}
    {url || !title && <link rel="canonical" href={url || defaults.title} />}
    <link rel="icon" type="image/png" href="/static/favicon.png" />
    <link rel="manifest" href="/static/manifest.json" />
    <meta name="theme-color" content="#b748b5" />
  </Head>
);
