const mongoose = require("mongoose");

const insightsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  insights: { type: {}, required: true },
});

module.exports = mongoose.model("insights", insightsSchema);
