const PermissionServices = require("../../services/PermissionServices");
const PermissionServicesInstance = new PermissionServices();

module.exports = async (req, res) => {
  const permissions = await PermissionServicesInstance.getPermissions();

  if (!permissions) return res.status(500).send("something error !");

  return res.status(200).send(permissions);
};
