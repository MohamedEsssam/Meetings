const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices();

module.exports = async (req, res) => {
  const departmentName = req.query.departmentName;

  const users = await UserServicesInstance.getAllUsers(departmentName);
  if (!users) return res.status(404).send("Users not found.");

  return res.status(200).send(users);
};
