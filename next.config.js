import withTypescript from "@zeit/next-typescript";
import withSass from "@zeit/next-sass";
import { EnvironmentPlugin } from "webpack";
import { config } from "dotenv";

config();

const setup = config => withTypescript(withSass(config));

export default setup({
  cssModules: true,
  webpack: config => {
    config.plugins.push(new EnvironmentPlugin(process.env));
    return config;
  }
});
