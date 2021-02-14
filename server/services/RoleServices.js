const sql = require("../startup/connectDB");

class RoleServices {
  async getAll() {
    const query = "SELECT * FROM role";

    return new Promise((resolve, reject) => {
      sql.query(query, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  }
}

module.exports = RoleServices;
