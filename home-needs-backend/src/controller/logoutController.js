const logoutRefresh = (req, res) => {
  res.clearCookie("refreshToken");

  res.json({
    message: "Logout successful"
  });
};

module.exports = logoutRefresh;