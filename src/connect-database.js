const { Client } = require("cassandra-driver");
const config = require("./config/index");

function createConection() {
  return new Client({
    cloud: {
      secureConnectBundle: config.db.secureConnectBundle,
    },
    credentials: {
      username: config.db.username,
      password: config.db.password,
    },
  });
}

module.exports = createConection;
