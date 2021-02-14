const DepartmentServices = require("../../services/DepartmentServices");
const DepartmentServicesInstance = new DepartmentServices();

module.exports = async (req, res) => {
  const department = await DepartmentServicesInstance.getAll();

  if (!department) return res.status(500).send("something error !");

  return res.status(200).send(department);
};
