const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const config = require("config");
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
      ]),
      ...ability,
    };
    const token = jwt.sign(payload, config.get("authSecret"));

    return token;
  }
}
module.exports = AuthServices;
