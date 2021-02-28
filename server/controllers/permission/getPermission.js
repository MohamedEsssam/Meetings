const PermissionServices = require("../../services/PermissionServices");
const PermissionServicesInstance = new PermissionServices();

module.exports = async (req, res) => {
  try {
    const permissionId = req.params.permissionId;
    const permission = await PermissionServicesInstance.getPermission(permissionId);

    if (!permission) return res.status(404).send("permission not found !");

    return res.status(200).send(permission);
  } catch (err) {
    console.log(err);
  }
};
