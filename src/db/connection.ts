import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");
  const environment = config.get<string>("nodeEnv");

  try {
    if(environment !== "testing"){
      await mongoose.connect(dbUri);
      logger.info("Connected to mongo db cluster!");
    } else{

    }
  } catch (error) {
    logger.error("Could not connect to db");
  }
}

export default connect;