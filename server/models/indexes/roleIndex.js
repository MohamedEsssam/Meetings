const sql = require("../../startup/connectDB");

const query = "CREATE UNIQUE INDEX ix_role_roleId ON role(roleId);";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
