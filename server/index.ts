import { config } from "dotenv";
config();

import next from "next";
import express from "express";
import { init } from "./startup";
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(express.json());
server.listen(port);

app
  .prepare()
  .then(init)
  // importing async to allow init to check
  // database.json first
  .then(() => import("./api/routes"))
  .then(router => {
    // @ts-ignore
    server.use(router.default);
    server.get("/tierlist/:id", (req, res) => {
      return app.render(req, res, "/tierlist", req.params);
    });
    server.get("*", (req, res) => handle(req, res));

    // tslint:disable-next-line:no-console
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });
