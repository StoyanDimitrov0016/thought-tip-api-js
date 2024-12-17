import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  port: process.env.PORT,
  baseURL: process.env.BASE_URL,
  mongoUri: process.env.MONGO_URI,
  accessTokenSecret: process.env.ACCESS_TOKEN_JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
};

export default envConfig;
