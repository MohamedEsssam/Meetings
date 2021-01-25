const express = require("express");
const publicRoutes = require("../routes/public");
// const privateRoutes = require("../routes/private");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api", [publicRoutes]);
};
