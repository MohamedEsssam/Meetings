const sql = require("../../startup/connectDB");

const query = "CREATE UNIQUE INDEX ix_meeting_meetingId ON meeting(meetingId);";

sql.query(query, (err, result) => {
  if (err) throw err;
  console.log(query);
});
