const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const config = require("../config");

// this bearerToken must be an id_token
exports.verifyIdToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.get("auth0.domain")}/.well-known/jwks.json`,
  }),

  issuer: `https://${config.get("auth0.domain")}/`,
  algorithms: ["RS256"],
});

exports.checkScopes = (scope) => jwtAuthz([scope]);
