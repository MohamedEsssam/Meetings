const io = require("../../startup/socket.io");
const PermissionServices = require("../../services/PermissionServices");
const PermissionServicesInstance = new PermissionServices();

module.exports = async (req, res) => {
  const representative = req.body.representative;
  const unit = req.body.unit;
  const destination = req.body.destination;
  const notes = req.body.notes;

  const permission = await PermissionServicesInstance.create(representative, unit, destination, notes);

  if (!permission) return res.status(500).send("something error !");

  io.getIO().emit("permission", { action: "create", permission: permission });
  return res.status(200).send(permission);
};
