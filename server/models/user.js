const sql = require("../startup/connectDB");

const query =
  "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS user; CREATE TABLE user (userId BINARY(16) NOT NULL PRIMARY KEY, name VARCHAR(50) NOT NULL, username VARCHAR(50) NOT NULL, job VARCHAR(50) NOT NULL, militaryRank VARCHAR(50) NOT NULL, unit VARCHAR(50) NOT NULL, army VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL CHECK(LENGTH(password)>3), roleId BINARY(16) NOT NULL, CONSTRAINT fk_roleId FOREIGN KEY (roleId) REFERENCES role(roleId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; SET FOREIGN_KEY_CHECKS = 1;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
