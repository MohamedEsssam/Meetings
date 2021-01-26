const MeetingServices = require("../../services/MeetingServices");
const MeetingServicesInstance = new MeetingServices();

module.exports = async (req, res) => {
  try {
    const meetingId = req.params.meetingId;
    const meeting = await MeetingServicesInstance.getMeeting(meetingId);

    if (!meeting) return res.status(404).send("meeting not found !");

    return res.status(200).send(meeting);
  } catch (err) {
    console.log(err);
  }
};
