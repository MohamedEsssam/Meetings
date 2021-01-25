const UserServices = require("../../services/UserServices");
const UserServicesInstance = new UserServices();

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const token = await UserServicesInstance.login(username, password);
  console.log(token);
  if (!token) return res.status(404).send("User not found.");

  return res
    .status(200)
    .header("Authorization", token)
    .header("access-control-expose-headers", "Authorization")
    .send("User logged in.");
};
