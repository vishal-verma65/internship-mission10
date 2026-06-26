import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { winstonLogger } from "./src/middleware/logger.js";

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  winstonLogger.info(`Server running on port: ${PORT}`);
});