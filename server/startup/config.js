const config = require("config");

module.exports = () => {
  if (!config.get("authSecret"))
    throw new Error("FATAL ERROR: auth secret is not defined.");

  if (!config.get("dbName"))
    throw new Error("FATAL ERROR: database name is not defined.");

  if (!config.get("dbPass"))
    throw new Error("FATAL ERROR: database password is not defined.");
};
