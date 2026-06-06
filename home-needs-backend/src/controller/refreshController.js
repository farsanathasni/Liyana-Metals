const jwt = require("jsonwebtoken");
const generateAccessToken =require("../services/generateToken")

const refreshAccessToken = async (req, res) => {
    console.log("Cookies received:", req.cookies); // ← add this

  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
        console.log("JWT_REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET); // ← add this

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const accessToken = generateAccessToken(decoded.id);

    res.json({ token: accessToken });

  } catch (error) {
        console.log("JWT verify error:", error.message); // ← add this

    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports=refreshAccessToken