const sql = require("../startup/connectDB");
const bcrypt = require("bcrypt");
const AuthServices = require("./AuthServices");
const AuthServicesInstance = new AuthServices();
class UserServices {
  async login(username, password) {
    const user = await this.getUserByUsername(username);
    if (!user) return;
    if (!(await bcrypt.compare(password, user.password))) return;

    delete user["password"];

    const token = AuthServicesInstance.generateToken(user);

    return token;
  }

  async register(
    name,
    username,
    job,
    militaryRank,
    unit,
    army,
    password,
    roleId
  ) {
    let user;
    user = await this.getUserByUsername(username);
    if (user) return;

    password = await this.encryptPassword(password);

    let query =
      "INSERT INTO user (userId, name, username, job, militaryRank, unit, army, password, roleId) VALUES (UUID(), ?, ?, ?, ?, ?, ? , ?, ?);";

    sql.query(
      query,
      [name, username, job, militaryRank, unit, army, password, roleId],
      (err, results, field) => {
        if (err) throw err;
      }
    );

    user = await this.getUserByUsername(username);
    delete user["password"];

    const token = AuthServicesInstance.generateToken(user);

    return token;
  }

  getUserByUsername(username) {
    let query =
      "SELECT userId , name, username, job, militaryRank, unit, army, roleType, password FROM user JOIN role r USING(roleId) WHERE username = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [username], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  getUserById(userId) {
    let query =
      "SELECT userId , name, username, job, militaryRank, unit, army, roleType, password FROM user JOIN role r USING(roleId) WHERE userId = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [userId], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  async encryptPassword(password) {
    const genSalt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, genSalt);
  }
}

module.exports = UserServices;
