const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: expired,
  });
};

module.exports = { generateToken };
