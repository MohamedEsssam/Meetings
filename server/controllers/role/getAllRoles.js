const RoleServices = require("../../services/RoleServices");
const RoleServicesInstance = new RoleServices();

module.exports = async (req, res) => {
  const roles = await RoleServicesInstance.getAll();

  if (!roles) return res.status(500).send("something error !");

  return res.status(200).send(roles);
};
