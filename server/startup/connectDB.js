const mysql = require("mysql");
const config = require("config");
const Logger = require("../services/LoggerService");
const logger = new Logger("app");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: config.get("dbPass"),
  database: config.get("dbName"),
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) logger.error(err);

  logger.info("connected successfully to database...");
});

module.exports = connection;
