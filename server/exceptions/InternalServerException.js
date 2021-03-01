const error = require("../startup/error");
const { HttpStatusCode } = require("./statusCode");

const InternalServerException = error.set(
  "InternalServerException",
  HttpStatusCode.INTERNAL_SERVER,
  "We will try to fix error soon."
);

module.exports.InternalServerException = InternalServerException;
