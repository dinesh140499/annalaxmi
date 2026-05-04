require("dotenv").config();
require("./config/db")();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const loginRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");

const app = express();

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
app.use("/api/v1", loginRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  console.log(Math.floor(1000 + Math.random() * 9000));
  res.send("API running...");
});

module.exports = app; // ✅ correct
