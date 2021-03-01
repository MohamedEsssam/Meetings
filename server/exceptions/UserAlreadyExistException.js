const error = require("../startup/error");
const { HttpStatusCode } = require("./statusCode");

const UserAlreadyExistException = error.set(
  "UserAlreadyExistException",
  HttpStatusCode.Conflict,
  "Change your username"
);

module.exports.UserAlreadyExistException = UserAlreadyExistException;
