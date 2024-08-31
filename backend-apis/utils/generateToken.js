const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  user.password = null;
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
