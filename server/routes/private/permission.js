const route = require("express").Router();
const getAllPermissions = require("../../controllers/permission/getAllPermissions");
const getPermission = require("../../controllers/permission/getPermission");
const createPermission = require("../../controllers/permission/createPermission");
const updatePermission = require("../../controllers/permission/updatePermission");
const deleteAllPermission = require("../../controllers/permission/deleteAllPermission");
const deletePermission = require("../../controllers/permission/deletePermission");
const authJwt = require("../../middleware/authJwt");

route.get("/", authJwt, getAllPermissions);
route.get("/:permissionId", authJwt, getPermission);
route.post("/", authJwt, createPermission);
route.put("/", authJwt, updatePermission);
route.delete("/deleteAll", authJwt, deleteAllPermission);
route.delete("/:permissionId", authJwt, deletePermission);


module.exports = route;
