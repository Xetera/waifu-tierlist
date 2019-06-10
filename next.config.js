import withTypescript from "@zeit/next-typescript";
import { EnvironmentPlugin } from "webpack";
import { config } from "dotenv"

config();

export default withTypescript({
  webpack: config => {
    config.plugins.push(new EnvironmentPlugin(process.env));
    return config;
  }
});
