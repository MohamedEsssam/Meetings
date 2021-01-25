const mysql = require("mysql");
const config = require("config");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: config.get("dbPass"),
  database: config.get("dbName"),
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;

  console.log("connected successfully to database...");
});

module.exports = connection;
