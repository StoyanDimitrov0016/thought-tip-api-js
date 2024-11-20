import envConfig from "../../config/envConfig.js";

export const WEEK_IN_MILLISECONDS = 604_800_000;

const isProduction = envConfig.nodeEnv === "production";

export const COOKIE_OPTIONS_DEFAULT = {
  httpOnly: true,
  maxAge: WEEK_IN_MILLISECONDS,
  sameSite: isProduction ? "None" : "Lax",
  secure: isProduction,
};
