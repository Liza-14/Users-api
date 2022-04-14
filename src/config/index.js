import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    secureConnectBundle: process.env.DB_SECURE_CONNECT_BUNDLE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  auth: {
    secretKey: process.env.AUTH_SECRET_KEY,
    secretUserKey: process.env.AUTH_SECRET_USER_KEY,
    url: process.env.AUTH_URL,
  },
  crimes: {
    url: process.env.CRIMES_URL,
  },
  appPort: process.env.PORT || 5000,
};
