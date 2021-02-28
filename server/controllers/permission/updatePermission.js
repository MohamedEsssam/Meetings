const io = require("../../startup/socket.io");
const PermissionServices = require("../../services/PermissionServices");
const PermissionServicesInstance = new PermissionServices();

module.exports = async (req, res) => {
  const permission = await PermissionServicesInstance.update(req.body);

  if (!permission) return res.status(500).send("something error can't update!");

  io.getIO().emit("permission", { action: "update", permission: permission });
  return res.status(200).send(permission);
};
