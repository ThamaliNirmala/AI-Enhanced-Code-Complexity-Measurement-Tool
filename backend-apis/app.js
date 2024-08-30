const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
