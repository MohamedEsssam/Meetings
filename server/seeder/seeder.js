const sql = require("../startup/connectDB");

const query = `INSERT INTO role (roleId, roleType) VALUES ('1', 'Commender'), ('2', 'Admin'), ('3', 'Secretary'), ('4', 'PoliceArmy'), ('5', 'ChiefCommander'); INSERT INTO user (userId, name, username, job, militaryRank, unit, army, password, roleId) VALUES ('1', 'Mohamed', 'MohamedEssam',?, ?, ?, ? , '$2b$10$jOeoPICgtMOVCPBDKG71gOeVleDChC/NyRHr7RItVAPkOJpcOMN0m', '5');`;

sql.query(
  query,
  ["القوات البحرية", "فرع النظم", "لواء", "قائد فرع النظم"],
  (err, result) => {
    if (err) throw err;
    console.log(query);
  }
);
