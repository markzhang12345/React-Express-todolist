const express = require("express");

const router = express.Router();
router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: 0 });
  res.status(200).json({ message: "Logged out" });
});
module.exports = router;
