const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  try {
    // 检查用户名是否已存在
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: "用户名已存在" });
    }
    const pattern = /^\w+$/;
    if (!pattern.test(name) || !pattern.test(password)) {
      return res
        .status(400)
        .json({ message: "用户名或密码不合法，只能包括英文，数字或下划线" });
    }

    // 创建新用户
    const newUser = new User({ name, password });
    await newUser.save();

    res.status(201).json({ message: "注册成功" });
  } catch (error) {
    res.status(500).json({ message: "服务器错误" });
  }
});

module.exports = router;
