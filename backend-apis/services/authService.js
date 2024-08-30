const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const emailService = require("./emailService");

exports.register = async (name, email, password) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  return generateToken(user._id);
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return generateToken(user._id);
  } else {
    throw new Error("Invalid email or password");
  }
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  const resetUrl = `${process.env.RESET_PASSWORD_URL}${resetToken}`;
  await emailService.sendResetPasswordEmail(user.email, resetUrl);
};

exports.resetPassword = async (resetToken, newPassword) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return generateToken(user._id);
};
