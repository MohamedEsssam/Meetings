const sql = require("../startup/connectDB");
const bcrypt = require("bcrypt");
const Logger = require("../services/LoggerService")
const logger = new Logger('app')
class UserServices {
  constructor(AuthServices, DepartmentService) {
    this.AuthServices = AuthServices;
    this.DepartmentService = DepartmentService;
  }

  async login(username, password) {
    const user = await this.getUserByUsername(username);
    if (!user) return;
    if (!(await bcrypt.compare(password, user.password))) return;

    delete user["password"];

    const token = this.AuthServices.generateToken(user);

    logger.setLogData({username: username})
    logger.info("Login user done", {username: username})

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
    roleId,
    departmentName
  ) {
    let user, department;
    user = await this.getUserByUsername(username);
    if (user) return;

    department = await this.DepartmentService.getDepartmentByName(
      departmentName
    );
    if (!department)
      department = await this.DepartmentService.create(departmentName);

    password = await this.encryptPassword(password);

    let query =
      "INSERT INTO user (userId, name, username, job, militaryRank, unit, army, password, roleId, departmentId) VALUES (UUID(), ?, ?, ?, ?, ?, ? , ?, ?, ?);";

    sql.query(
      query,
      [
        name,
        username,
        job,
        militaryRank,
        unit,
        army,
        password,
        roleId,
        department.departmentId,
      ],
      (err, results, field) => {
        if (err) logger.error(err);
      }
    );

    user = await this.getUserByUsername(username);
    delete user["password"];

    const token = this.AuthServices.generateToken(user);

    logger.setLogData({name: name, username: username, job: job, militaryRank: militaryRank, unit: unit, army: army,
       password: password, roleId: roleId, departmentId: department['departmentId']})
    logger.info("Create user done", {name: name, username: username, job: job, militaryRank: militaryRank, unit: unit, army: army,
                                     password: password, roleId: roleId, departmentId: department['departmentId']})

    return token;
  }

  getAllUsers(departmentName) {
    const query =
      "SELECT userId , name, username, job, militaryRank, unit, army, roleType, departmentId, departmentName, password FROM user JOIN role r JOIN department d USING(departmentId) WHERE departmentName = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [departmentName], (err, result, field) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  }

  getUserByUsername(username) {
    let query =
      "SELECT userId , name, username, job, militaryRank, unit, army, roleType, departmentId, departmentName, password FROM user JOIN role r USING(roleId) JOIN department d USING(departmentId) WHERE username = ? ;";

    return new Promise((resolve, reject) => {
      sql.query(query, [username], (err, result, field) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }

  getUserById(userId) {
    let query =
      "SELECT userId , name, username, job, militaryRank, unit, army, roleType, departmentId, departmentName, password FROM user JOIN role r JOIN department d USING(departmentId) WHERE userId = ? ;";

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
