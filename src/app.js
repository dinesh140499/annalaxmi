require("dotenv").config();
require("./config/db")();



const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const errorMiddleware = require("./middleware/error.middleware");
const ErrorHandler = require("./utils/errorHandler");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const addressRoute = require("./routes/address.route");

const app = express();

/* =========================================
   SECURITY MIDDLEWARE
========================================= */

app.use(helmet());

/* =========================================
   COMPRESS RESPONSE
========================================= */

app.use(compression());

/* =========================================
   BODY PARSER
========================================= */

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/* =========================================
   COOKIE PARSER
========================================= */

app.use(cookieParser());

/* =========================================
   STATIC FOLDER
========================================= */

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);

/* =========================================
   RATE LIMITER
========================================= */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use("/api", limiter);

/* =========================================
   CORS
========================================= */

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

/* =========================================
   ROUTES
========================================= */

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", addressRoute);

/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running...",
  });
});

app.use((req, res, next) => {
  return next(new ErrorHandler("Route not found", 404));
});

/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use(errorMiddleware);

module.exports = app;