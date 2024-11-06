import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
};

export default envConfig;
