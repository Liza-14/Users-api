const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { logger } = require("./logger");
const { options } = require("../swagger-config");
const config = require("./config");
const { usersRouter } = require("./routes/users");

const bootstrap = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.use((req, res, next) => {
    logger.info({ req });
    next();
  });

  app.use(usersRouter);

  app.use((err, req, res, next) => {
    if (err) {
      logger.error({ req, err });
      res.status(500).send("Internal error. More details in logs");
    } else {
      logger.info({ req, err });
    }
    next();
  });

  app.listen(config.appPort);
};

module.exports = { bootstrap };
