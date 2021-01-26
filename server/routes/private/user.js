const route = require("express").Router();
const register = require("../../controllers/user/register");

route.post("/register", register);

module.exports = route;
