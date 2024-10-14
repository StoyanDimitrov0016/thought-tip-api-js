import mongoose from "mongoose";
import envConfig from "./envConfig.js";

const databaseConnection = async () => {
  try {
    const connectionString = envConfig.mongoUri;

    if (!connectionString) {
      throw new Error("MONGO_URI is a falsy value - make sure it's imported correctly!");
    }

    // Connect to MongoDB
    await mongoose.connect(connectionString);
    console.log("Database connected successfully.");

    // Connection Event Listeners
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to the database.");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from the database.");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Mongoose connection closed due to application termination.");
      process.exit(0);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database connection failed with error:", error.message);
      console.error("Stack trace:", error.stack);
    } else {
      console.error("An unknown error occurred during database connection:", error);
    }
    throw error;
  }
};

export default databaseConnection;
