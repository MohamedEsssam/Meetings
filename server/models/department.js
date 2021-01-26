const sql = require("../startup/connectDB");

const query =
  "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS department; CREATE TABLE department (departmentId VARCHAR(50) NOT NULL PRIMARY KEY, departmentName VARCHAR(50) NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; SET FOREIGN_KEY_CHECKS = 1;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
