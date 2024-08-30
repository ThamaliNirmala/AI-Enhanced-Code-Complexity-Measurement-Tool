const authService = require("../services/authService");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const token = await authService.register(name, email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await authService.forgotPassword(email);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  try {
    const token = await authService.resetPassword(resetToken, newPassword);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
