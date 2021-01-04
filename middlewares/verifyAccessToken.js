const AuthenticationClient = require("auth0").AuthenticationClient;
const config = require("../config");
const asyncWrapper = require("./asyncWrapper");

module.exports = asyncWrapper(async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(401).send("Unauthorized");
  }

  const bearerHeader = req.headers["authorization"];

  const bearer = bearerHeader.split(" ");

  const bearerToken = bearer[1];

  const auth0 = new AuthenticationClient({
    domain: config.get("auth0.domain"),
    clientId: config.get("auth0.clientId"),
    clientSecret: config.get("auth0.clientSecret"),
  });

  // this bearerToken must be an access_token
  const userInfo = await auth0.getProfile(bearerToken);
  req.user = userInfo;

  next();
});
