const sql = require("../../startup/connectDB");

const query =
  "CREATE UNIQUE INDEX ix_user_userId_username ON user(userId, username);";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
