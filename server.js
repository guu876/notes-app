require("dotenv").config();
const express = require("express");
const server = express();
const path = require("path");
const { logger } = require("./v1/middlewares/logger");
const errorHandler = require("./v1/middlewares/errorHandler.js");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const { logEvents } = require("./v1/middlewares/logger.js");

server.use(logger);
server.use(cors(corsOptions));

connectDB();

server.use(express.json());

server.use("/v1/users", require("./v1/routes/userRoutes"));
server.use("/auth", require("./v1/routes/authRoutes"));

const PORT = process.env.PORT || 3500;
mongoose.connection.once("open", () => {
  server.listen(PORT, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode, at http://localhost:${PORT}`
    );
  });
});

mongoose.connection.on("error", (error) => {
  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongo_errors.log"
  );
});
