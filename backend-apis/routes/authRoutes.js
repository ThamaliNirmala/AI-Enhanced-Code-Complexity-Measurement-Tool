const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

// Protected route
// router.get('/profile', protect, (req, res) => {
//   res.json({ user: req.user });
// });


module.exports = router;
