const error = require("../startup/error");
const { HttpStatusCode } = require("./statusCode");

const NotFoundException = error.set(
  "NotFoundException",
  HttpStatusCode.NOT_FOUND,
  "The things you look for is not found."
);

module.exports.NotFoundException = NotFoundException;
