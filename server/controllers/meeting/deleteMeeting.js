const io = require("../../startup/socket.io");
const MeetingServices = require("../../services/MeetingServices");
const MeetingServicesInstance = new MeetingServices();

module.exports = async (req, res) => {
  const meetingId = req.body.meetingId;

  const meeting = await MeetingServicesInstance.delete(meetingId);

  if (!meeting) return res.status(500).send("something error can't delete!");

  io.getIO().emit("meeting", { action: "delete", meeting: meeting });
  return res.status(200).send(meeting);
};
