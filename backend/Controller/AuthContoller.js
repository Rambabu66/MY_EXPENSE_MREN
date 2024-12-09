const UserModel = require("../Modules/User");
const bcrypt = require("bcryptjs");
const JWt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User Already Exit,plz login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();
    res.status(201).json({
      message: "SignUp Succefully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server",
      success: false,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Plz check email",
        success: false,
      });
    }

    const isPassEqul = await bcrypt.compare(password, user.password);
    if (!isPassEqul) {
      return res.status(403).json({
        message: "Plz check password",
        success: false,
      });
    }

    const JwtToken = JWt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SCRECT,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Login Succefully",
      success: true,
      JwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server",
      success: false,
    });
  }
};

module.exports = { Signup, Login };
