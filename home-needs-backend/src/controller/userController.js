const User=require("../model/user")
const generateAccessToken=require("../services/generateToken")
const generateRefreshToken=require("../services/refreshToken")
const bcrypt=require("bcryptjs")

const registration = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "user already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
const refreshToken = generateRefreshToken(user._id);
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
     role: user.role,
    token: generateAccessToken(user._id),
  });
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.status === "blocked") {
    return res.status(403).json({ message: "Your account is blocked" });
  }


    const match = await bcrypt.compare(password, user.password);

if (!match) {
  return res.status(401).send("Invalid credentials");
}

const refreshToken = generateRefreshToken(user._id);

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});

return res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateAccessToken(user._id)
});
    
  }

module.exports={registration,loginUser}