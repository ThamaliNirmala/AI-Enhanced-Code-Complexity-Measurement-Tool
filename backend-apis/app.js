const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const fileUploadRoutes = require("./routes/fileUploadRoutes");
const dashBoardRoutes = require("./routes/insightsRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", fileUploadRoutes);
app.use("/api/insights", dashBoardRoutes);

// Swagger UI setup
const swaggerSpec = yaml.load(
  fs.readFileSync(path.join(__dirname, "./config/swagger.yml"), "utf8")
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
