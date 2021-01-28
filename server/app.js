const express = require("express");
const app = express();
const server = app.listen(9000, () => {
  console.log("app listening on port 9000!");
});

require("./startup/config")();
require("./startup/cors")(app);
require("./startup/helmet")(app);
require("./startup/connectDB");
require("./models/createTables");
require("./seeder/seeder");
require("./startup/routes")(app);
require("./startup/socket.io").init(server);
