const io = require("../../startup/socket.io");
const DepartmentService = require("../../services/DepartmentServices");
const DepartmentServiceInstance = new DepartmentService();
const MeetingServices = require("../../services/MeetingServices");
const MeetingServicesInstance = new MeetingServices(DepartmentServiceInstance);

module.exports = async (req, res) => {
  const meeting = await MeetingServicesInstance.update(req.body);

  if (!meeting) return res.status(500).send("something error can't update!");

  io.getIO().emit("meeting", { action: "update", meeting: meeting });
  return res.status(200).send(meeting);
};
