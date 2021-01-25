const sql = require("../startup/connectDB");
const bcrypt = require("bcrypt");
const AuthServices = require("./AuthServices");
const AuthServicesInstance = new AuthServices();
class UserServices {
  async login(username, password) {
    const user = await this.getUserByUsername(username);
    if (!user) return;
    console.log(user);
    console.log(await bcrypt.compare(password, user.password));
    if (!(await bcrypt.compare(password, user.password))) return;

    delete user["password"];

    const token = AuthServicesInstance.generateToken(user);

    return token;
  }

  async register(name, username, email, password) {
    let user;
    user = await this.getUserByUsername(username);
    if (user) return;

    password = await this.encryptPassword(password);

    let query =
      "INSERT INTO user (userId, name, email, password)  VALUES (UUID_TO_BIN(UUID()), ?, ?, ?) ;";
    sql.query(query, [name, email, password], (err, results, field) => {
      if (err) throw err;
    });

    query =
      "SELECT BIN_TO_UUID(userId) AS userId, name, email FROM user WHERE email = ? ;";

    user = await new Promise((resolve, reject) => {
      sql.query(query, [email, password], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });

    const token = AuthServicesInstance.generateToken(user);

    return token;
  }

  getUserByUsername(username) {
    console.log("username", username);
    let query =
      "SELECT userId , name, username, job, militaryRank, unit, army, r.roleType, password FROM user JOIN role r USING(roleId) WHERE username = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [username], (err, result, field) => {
        if (err) reject(err);

        console.log(result[0]);
        resolve(result[0]);
      });
    });
  }

  getUserById(userId) {
    let query = "SELECT * FROM user WHERE userId = UUID_TO_BIN(?);";

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
