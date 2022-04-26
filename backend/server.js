import mongoose from "mongoose";
import app from "./app.js";

import { ENVIRONMENT, MONGO_URI, PORT } from "./utils/env_values.js";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💢 Shutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose.connect(MONGO_URI).then(() => console.log("DB CONNECTED"));

const server = app.listen(PORT, () =>
  console.log(
    `SERVER RUNNING @ http://localhost:${PORT} | ${ENVIRONMENT.toUpperCase()} MODE`
  )
);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLE REJECTION! 💢 Shutting Down...");
  server.close(() => {
    process.exit(1);
  });
});
