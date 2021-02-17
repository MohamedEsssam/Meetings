const sql = require("../startup/connectDB");

const query =
  "DROP TABLE IF EXISTS meeting; CREATE TABLE meeting (meetingId VARCHAR(50) NOT NULL PRIMARY KEY, status ENUM('Pending', 'Accepted', 'Delayed', 'Rejected', 'Exit') DEFAULT 'Pending' NOT NULL, comeAt DATETIME NOT NULL, enteredAt DATETIME, exitAt DATETIME, delayDate DATETIME, personName VARCHAR(50) NOT NULL, personType ENUM('Civil','Military') DEFAULT 'Military' NOT NULL, army VARCHAR(50) NOT NULL, unit VARCHAR(50) NOT NULL, job VARCHAR(50) NOT NULL, militaryRank VARCHAR(50) NOT NULL, administrator VARCHAR(50) NOT NULL, departmentId VARCHAR(50) NOT NULL, CONSTRAINT fk_department FOREIGN KEY (departmentId) REFERENCES department(departmentId) ON DELETE RESTRICT ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
