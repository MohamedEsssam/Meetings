const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const config = require("config");
const { defineAbilitiesFor } = require("../startup/abilities");
class AuthServices {
  generateToken(user) {
    console.log(user);
    const ability = defineAbilitiesFor(user.roleType);
    console.log(ability);
    const payload = { ...pick(user, ["userId", "username"]), ...ability };
    const token = jwt.sign(payload, config.get("authSecret"));

    return token;
  }
}
module.exports = AuthServices;
