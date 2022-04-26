import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 1234;
export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_LOCAL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_COOKIE_EXPIRESIN = process.env.JWT_COOKIE_EXPIRESIN;
