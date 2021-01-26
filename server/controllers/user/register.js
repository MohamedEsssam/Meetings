const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices();

module.exports = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const job = req.body.job;
  const militaryRank = req.body.militaryRank;
  const unit = req.body.unit;
  const army = req.body.army;
  const password = req.body.password;
  const roleId = req.body.roleId;

  const token = await UserServicesInstance.register(
    name,
    username,
    job,
    militaryRank,
    unit,
    army,
    password,
    roleId
  );
  if (!token) return res.status(409).send("User already exist.");

  return res
    .status(200)
    .header("Authorization", token)
    .header("access-control-expose-headers", "Authorization")
    .send("User created.");
};
