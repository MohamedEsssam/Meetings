const route = require("express").Router();
const register = require("../../controllers/user/register");
const getAllUsers = require("../../controllers/user/getAllUsers");
const authJwt = require("../../middleware/authJwt");

route.post("/register", authJwt, register);
route.get("/", authJwt, getAllUsers);

module.exports = route;
