const MeetingServices = require("../../services/MeetingServices");
const MeetingServicesInstance = new MeetingServices();

module.exports = async (req, res) => {
  const departmentId = req.query.departmentId;

  const meetings = await MeetingServicesInstance.getMeetings(departmentId);

  if (!meetings) return res.status(500).send("something error !");

  return res.status(200).send(meetings);
};
