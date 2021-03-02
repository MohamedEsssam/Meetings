const sql = require("../../startup/connectDB");

const query =
  "CREATE UNIQUE INDEX ix_permission_permissionId ON permission(permissionId);";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
