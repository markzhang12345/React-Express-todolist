const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = "dut";

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    //检查用户名是否存在
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "该用户不存在" });
    }
    //检查密码是否正确
    const passwordCorrect = await user.comparePassword(password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "密码错误" });
    }
    // 生成JWT
    const token = jwt.sign({ username: user.name }, SECRET_KEY, {
      expiresIn: "1h",
    });
    // 存 JWT 到 cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.status(200).json({ message: "登录成功", username: user.name });
  } catch (error) {
    res.status(500).json({ message: "服务器错误" });
  }
});

module.exports = router;
