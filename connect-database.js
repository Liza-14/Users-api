import { Client } from "cassandra-driver";
import { config } from "./src/config/index";

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

export default createConection;
