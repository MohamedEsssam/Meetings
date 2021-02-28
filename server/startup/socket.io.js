const Logger = require("../services/LoggerService")
const logger = new Logger('app')
let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server);
    io.on("connection", (socket) => {
      logger.info("client connected");
    });

    return io;
  },
  getIO: () => {
    if (!io) logger.error("socket.io not initialized");

    return io;
  },
};
