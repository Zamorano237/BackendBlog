const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-16hcgvlbj27v7kxv.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:3500",
  issuer: "https://dev-16hcgvlbj27v7kxv.us.auth0.com/",
  algorithms: ["RS256"],
});

module.exports = jwtCheck;
