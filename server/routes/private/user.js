const route = require("express").Router();
const register = require("../../controllers/user/register");
const authJwt = require("../../middleware/authJwt");

route.post("/register", authJwt, register);

module.exports = route;
