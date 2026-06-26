import mongoose from "mongoose";
import { winstonLogger } from "../middleware/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    winstonLogger.info(`MongoDB Connected`);
  } catch (error) {
    winstonLogger.error(`DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;