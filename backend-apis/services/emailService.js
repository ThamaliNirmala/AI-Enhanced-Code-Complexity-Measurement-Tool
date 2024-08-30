const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendResetPasswordEmail = async (email, resetUrl) => {
  const message = `
    <h1>You requested a password reset</h1>
    <p>Please go to this link to reset your password:</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  `;

  await transporter.sendMail({
    to: email,
    subject: "Password Reset Request",
    html: message,
  });
};
