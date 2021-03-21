const schedule = require("node-schedule");
const MeetingServices = require("../services/MeetingServices");
const MeetingServicesInstance = new MeetingServices();

schedule.scheduleJob("0 0 * * *", async () => {
  console.log("Start deleting chats");
  const meetings = await MeetingServicesInstance.getMeetings();
  if (!meetings) return;

  await MeetingServicesInstance.hideAll();
});