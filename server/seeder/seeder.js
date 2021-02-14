const sql = require("../startup/connectDB");

const query = `INSERT INTO role (roleId, roleType) VALUES ('1', 'ChiefCommander'), ('2', 'Commander'), ('3', 'Admin'), ('4', 'PoliceArmy'), ('5', 'Inquiries'), ('6', 'Secretary'); INSERT INTO department (departmentId, departmentName) VALUES ('1', 'رئيس فرع الامن'), ('2', 'نائب رئيس فرع الامن'), ('3', 'سكرتارية رئيس فرع الامن'), ('4', 'قسم الجزاءات'), ('5', 'قسم الافراد'), ('6', 'قسم الشركات'), ('7', 'قسم المنشأت'), ('8', 'قسم الادارة المحلية'), ('9', 'الاستعلامات'); INSERT INTO user (userId, name, username, job, militaryRank, unit, army, password, roleId, departmentId) VALUES ('1', 'محمد عصام', 'MohamedEssam',?, ?, ?, ? , '$2b$10$jOeoPICgtMOVCPBDKG71gOeVleDChC/NyRHr7RItVAPkOJpcOMN0m', '1', '1');`;

sql.query(
  query,
  ["قائد فرع الامن", "لواء", "فرع الامن", "القوات البحرية"],
  (err, result) => {
    if (err) throw err;
    console.log(query);
  }
);
