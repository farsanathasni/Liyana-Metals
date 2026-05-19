const jwt = require("jsonwebtoken");
const generateAccessToken =require("../services/generateToken")

const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const accessToken = generateAccessToken(decoded.id);

    res.json({ token: accessToken });

  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports=refreshAccessToken