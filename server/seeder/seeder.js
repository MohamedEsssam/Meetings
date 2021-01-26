const sql = require("../startup/connectDB");

const query = `INSERT INTO role (roleId, roleType) VALUES ('1', 'ChiefCommander'), ('2', 'Commender'), ('3', 'Admin'), ('4', 'PoliceArmy'), ('5', 'Inquiries'), ('6', 'Secretary'); INSERT INTO department (departmentId, name) VALUES ('1', 'مكتب القائد'); INSERT INTO user (userId, name, username, job, militaryRank, unit, army, password, roleId, departmentId) VALUES ('1', 'Mohamed', 'MohamedEssam',?, ?, ?, ? , '$2b$10$jOeoPICgtMOVCPBDKG71gOeVleDChC/NyRHr7RItVAPkOJpcOMN0m', '1', '1');`;

sql.query(
  query,
  ["قائد فرع الامن", "لواء", "فرع الامن", "القوات البحرية"],
  (err, result) => {
    if (err) throw err;
    console.log(query);
  }
);
