const io = require("../../startup/socket.io");
const DepartmentService = require("../../services/DepartmentServices");
const DepartmentServiceInstance = new DepartmentService();
const MeetingServices = require("../../services/MeetingServices");
const MeetingServicesInstance = new MeetingServices(DepartmentServiceInstance);

module.exports = async (req, res) => {
  const personName = req.body.personName;
  const personType = req.body.personType;
  const job = req.body.job;
  const militaryRank = req.body.militaryRank;
  const unit = req.body.unit;
  const army = req.body.army;
  const administrator = req.body.administrator;
  const departmentName = req.body.departmentName;

  const meeting = await MeetingServicesInstance.create(
    personName,
    personType,
    job,
    militaryRank,
    unit,
    army,
    administrator,
    departmentName
  );

  if (!meeting) return res.status(500).send("something error !");

  io.getIO().emit("meeting", { action: "create", meeting: meeting });
  return res.status(200).send(meeting);
};
