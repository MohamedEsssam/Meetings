const router = require("express").Router();
const user = require("./user");
const image = require("./image");

router.use("/user", user);
router.use("/image", image);

module.exports = router;
