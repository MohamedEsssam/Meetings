const io = require("../../startup/socket.io");
const MeetingServices = require("../../services/MeetingServices");
const MeetingServicesInstance = new MeetingServices();

module.exports = async (req, res) => {
  const meetings = await MeetingServicesInstance.deleteAll();

   if (!meetings) return res.status(500).send("something error can't delete!");

  io.getIO().emit("meeting", { action: "deleteAll", meetings: meetings });
  return res.status(200).send(meetings);
};
