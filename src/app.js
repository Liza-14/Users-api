import { usersRouter } from "./routes/users";
import { config } from "./config";
import { options } from "../swagger-config";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

export const bootstrap = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.use(usersRouter);

  app.listen(config.appPort);

  app.on("error", (err) => {
    console.error("server error", err);
  });
};
