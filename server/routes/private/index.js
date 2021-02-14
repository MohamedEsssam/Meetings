const router = require("express").Router();
const user = require("./user");
const meeting = require("./meeting");
const role = require("./role");
const department = require("./department");

router.use("/user", user);
router.use("/meeting", meeting);
router.use("/role", role);
router.use("/department", department);


module.exports = router;
