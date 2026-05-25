require("dotenv").config();
require("./config/db")();

const helmet = require("helmet");
const path = require("path");
const compression = require("compression");
const errorMiddleware = require("./middleware/error.middleware");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ErrorHandler = require("./utils/errorHandler");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const addressRoute = require("./routes/address.route");

const app = express();

console.log(process.cwd());

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

// Middleware
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  }),
);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", addressRoute);

app.get("/", (req, res) => {
  res.send("API running...");
});

app.all("*", (req, res, next) => {
  return next(ErrorHandler("Route not found", 404));
});

app.use(errorMiddleware);
module.exports = app;
