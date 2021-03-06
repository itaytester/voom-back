import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import logger from "../utils/logger";
import config from "config"

export async function connect() {
  const dbUri = config.get<string>("dbUri");
  const environment = config.get<string>("nodeEnv");

  try {
    if (environment !== "test") {
      await mongoose.connect(dbUri);
      logger.info(`Connected to mongo db cluster!`);
    } else {
      const mongoServer = await MongoMemoryServer.create();

      await mongoose.connect(mongoServer.getUri());
      logger.info("Connected mocked DB");
    }
  } catch (error) {
    logger.error("Could not connect to db");
  }
}

export async function disconnect() {
  await mongoose.disconnect();
  await mongoose.connection.close();
}
