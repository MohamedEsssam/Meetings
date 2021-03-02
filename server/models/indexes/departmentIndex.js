const sql = require("../../startup/connectDB");

const query =
  "CREATE UNIQUE INDEX ix_department_departmentId_departmentName ON department(departmentId, departmentName);";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
