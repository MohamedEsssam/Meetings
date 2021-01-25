const sql = require("../startup/connectDB");

const query =
  "DROP TABLE IF EXISTS meeting; CREATE TABLE meeting (meetingId VARCHAR(50) NOT NULL PRIMARY KEY, army VARCHAR(50) NOT NULL, unit VARCHAR(50) NOT NULL, job VARCHAR(50) NOT NULL, militaryRank VARCHAR(50) NOT NULL, personName VARCHAR(50) NOT NULL, personType ENUM('Civil','Military') DEFAULT 'Military' NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
