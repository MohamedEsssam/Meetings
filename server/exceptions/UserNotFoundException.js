const error = require("../startup/error");
const { HttpStatusCode } = require("./statusCode");

const UserNotFoundException = error.set(
  "UserUserNotFoundException",
  HttpStatusCode.NOT_FOUND,
  "You enter invalid email or password."
);

module.exports.UserNotFoundException = UserNotFoundException;
