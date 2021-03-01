const express = require("express");
const config = require("config");
const path = require("path");
const Logger = require("./services/LoggerService");
const logger = new Logger("app");
const app = express();
const server = app.listen(9000 /*, config.get(serverIp)*/, () => {
  logger.info("app listening on port 9000!");
});

app.use(express.static(path.join(__dirname, "public")));

require("./startup/swagger")(app);
require("./startup/config")();
require("./startup/cors")(app);
require("./startup/helmet")(app);
require("./startup/connectDB");
// require("./models/createTables");
// require("./seeder/seeder");
require("./startup/routes")(app);
require("./startup/socket.io").init(server);
