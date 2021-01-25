const route = require("express").Router();
const login = require("../../controllers/user/login");

route.post("/login", login);

module.exports = route;
