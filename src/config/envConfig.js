import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
export default envConfig;
