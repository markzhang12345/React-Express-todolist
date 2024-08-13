const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//保存用户时加密密码
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next(); // 如果密码未修改，跳过加密

  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    user.password = hashedPassword;
    next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
