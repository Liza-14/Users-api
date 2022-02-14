import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {},
  appPort: process.env.APP_PORT || 5000,

};
