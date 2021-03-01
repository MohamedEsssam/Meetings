const error = require("../startup/error");
const { HttpStatusCode } = require("./statusCode");

const InValidDataException = error.set(
  "InValidDataException",
  HttpStatusCode.BAD_REQUEST,
  "Enter a valid data."
);

module.exports.InValidDataException = InValidDataException;
