import express from "express";
import dotenv from "dotenv";
import logger, { winstonLogger } from "./middleware/logger.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(logger);

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Data Hub API is running" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  winstonLogger.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

export default app;