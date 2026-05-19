const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );
};



module.exports = generateAccessToken