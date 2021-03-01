const AuthServices = require("../../services/AuthServices");
const AuthServicesInstance = new AuthServices();
const DepartmentService = require("../../services/DepartmentServices");
const DepartmentServiceInstance = new DepartmentService();
const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices(
  AuthServicesInstance,
  DepartmentServiceInstance
);
const {
  UserAlreadyExistException,
} = require("../../exceptions/UserAlreadyExistException");

module.exports = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const job = req.body.job;
  const militaryRank = req.body.militaryRank;
  const unit = req.body.unit;
  const army = req.body.army;
  const password = req.body.password;
  const roleId = req.body.roleId;
  const departmentName = req.body.departmentName;

  const token = await UserServicesInstance.register(
    name,
    username,
    job,
    militaryRank,
    unit,
    army,
    password,
    roleId,
    departmentName
  );
  if (!token) return res.status(409).send(UserAlreadyExistException);

  return res
    .status(200)
    .header("Authorization", token)
    .header("access-control-expose-headers", "Authorization")
    .send("User created.");
};
