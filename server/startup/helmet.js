const helmet = require("helmet");

module.exports = function (app) {
  const options = {
    frameguard: {
      action: "deny",
    },
  };
  app.use(helmet(options));
};
