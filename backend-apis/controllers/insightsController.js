const insightsService = require("../services/insightsService");

exports.saveCodeInsights = async (req, res) => {
  const { userId } = req.params;
  const { insights } = req.body;

  try {
    await insightsService.saveCodeInsights(userId, insights);
    res.status(201).json({ message: "Code Insights Saved Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getCodeInsights = async (req, res) => {
  const { userId } = req.params;

  try {
    const insights = await insightsService.getCodeInsights(userId);
    res.status(201).json(insights);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteCodeInsight = async (req, res) => {
  const { id } = req.params;

  try {
    await insightsService.deleteCodeInsight(id);
    res.status(200).json({ message: "Insight Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
