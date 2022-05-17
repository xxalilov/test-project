import { app } from "./app";
import { db } from "./services/postgres";
import { socket } from "./services/socket";

const start = async () => {
  // Connect DB
  await db();

  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  // Connect Socket
  socket(server);

  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

start();
