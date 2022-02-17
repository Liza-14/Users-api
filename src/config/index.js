import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {},
  appPort: process.env.PORT || 5000,

};
