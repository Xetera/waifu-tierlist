const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");
const { EnvironmentPlugin } = require("webpack");
const { config } = require("dotenv");

config();

const setup = config => withTypescript(withSass(config));

module.exports = setup({
  cssModules: true,
  distDir: "dist",
  publicRuntimeConfig: {
    API_URL: process.env.WAIFU_TIERLIST_URL
  },
  webpack: config => config
});
