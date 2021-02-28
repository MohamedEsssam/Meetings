const sql = require("../startup/connectDB");

const query =
  "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS permission; CREATE TABLE permission (permissionId VARCHAR(50) NOT NULL PRIMARY KEY, representative VARCHAR(50) NOT NULL, unit VARCHAR(50) NOT NULL, destination VARCHAR(50) NOT NULL, notes VARCHAR(50) NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; SET FOREIGN_KEY_CHECKS = 1;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
