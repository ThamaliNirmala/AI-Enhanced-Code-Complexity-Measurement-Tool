const Insights = require("../models/insightsModel");

const saveCodeInsights = async (userId, insights) => {
  try {
    const newInsights = new Insights({ userId, insights });
    await newInsights.save();
    return;
  } catch (error) {
    throw new Error(error);
  }
};
const getCodeInsights = async (userId) => {
  try {
    return await Insights.find({ userId });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCodeInsight = async (id) => {
  try {
    return await Insights.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { saveCodeInsights, getCodeInsights, deleteCodeInsight };
