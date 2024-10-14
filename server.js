import envConfig from "./src/config/envConfig.js";
import app from "./src/app.js";
import databaseConnection from "./src/config/databaseConnection.js";

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    await databaseConnection();
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();