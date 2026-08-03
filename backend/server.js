process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!");
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require("./src/app");

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
