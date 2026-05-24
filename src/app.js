require("dotenv").config();
require("./config/db")();
const path = require("path");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const addressRoute = require("./routes/address.route");

const app = express();

console.log(process.cwd())

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let allowOrigin = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowOrigin.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
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

module.exports = app;
