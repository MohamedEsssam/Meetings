const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const config = require("config");
const Logger = require("../services/LoggerService");
const logger = new Logger("app");
const { defineAbilitiesFor } = require("../startup/abilities");
class AuthServices {
  generateToken(user) {
    const ability = defineAbilitiesFor(user.roleType);
    const payload = {
      ...pick(user, [
        "userId",
        "name",
        "username",
        "job",
        "militaryRank",
        "unit",
        "army",
        "departmentId",
        "departmentName",
        "roleType",
      ]),
      ...ability,
    };
    const token = jwt.sign(payload, config.get("authSecret"));

    logger.setLogData("Token generated.");

    return token;
  }
}
module.exports = AuthServices;
