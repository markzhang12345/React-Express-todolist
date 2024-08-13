const jwt = require("jsonwebtoken");
const SECRET_KEY = "dut";

const authenticateToken = (req, res, next) => {
  // 从 Cookie 中提取 Token
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401); // 如果没有 Token，返回 401

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // 如果 Token 无效，返回 403

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
