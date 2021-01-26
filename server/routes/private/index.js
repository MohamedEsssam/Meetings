const router = require("express").Router();
const user = require("./user");
const meeting = require("./meeting");

router.use("/user", user);
router.use("/meeting", meeting);

module.exports = router;
