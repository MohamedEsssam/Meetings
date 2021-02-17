const express = require("express");
const config = require("config");
const app = express();
const server = app.listen(9000 /*, config.get(serverIp)*/, () => {
  console.log("app listening on port 9000!");
});

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/helmet")(app);
require("./startup/connectDB");
// require("./models/createTables");
// require("./seeder/seeder");
require("./startup/routes")(app);
require("./startup/socket.io").init(server);
