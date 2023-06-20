require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./v1/middlewares/logger");
const errorHandler = require("./v1/middlewares/errorHandler.js");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/db");

app.use(logger);
app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.use("/v1/users", require("./v1/routes/userRoutes"));
app.use("/auth", require("./v1/routes/authRoutes"));

module.exports = app;