const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.JWT_KEY || "no_secret";

const checkToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      error: "please provide a token",
    });
  }

  if (token.toLowerCase().startsWith("bearer")) {
    token = token.slice("bearer".length).trim();
  }

  const jwtPayload = jwt.verify(token, secret_key);

  if (!jwtPayload) {
    return res.status(403).json({
      error: "unauthenticated",
    });
  }

  res.user = jwtPayload;

  next();
};

module.exports = checkToken;
