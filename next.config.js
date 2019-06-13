const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");
const withOffline = require("next-offline");
const withImages = require("next-images");
const { EnvironmentPlugin } = require("webpack");
const { config } = require("dotenv");

config();

const compose = (...fs) => x => fs.reduce((state, fs) => fs(state), x);

const setup = config => compose(
  withImages,
  withTypescript,
  withSass,
  withOffline
)(config);

module.exports = setup({
  cssModules: true,
  distDir: "dist",
  env: {
    API_URL: process.env.WAIFU_TIERLIST_URL,
    DB_URL: process.env.WAIFU_TIERLIST_MONGODB_URL
  },
  webpack: config => {
    config.plugins.push(new EnvironmentPlugin(process.env));
    return config;
  }
});
