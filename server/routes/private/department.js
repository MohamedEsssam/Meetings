const route = require("express").Router();
const getAll = require("../../controllers/department/getAllDepartments");
const authJwt = require("../../middleware/authJwt");

route.get("/", authJwt, getAll);

module.exports = route;
