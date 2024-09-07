const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const { GEN_AI_API_KEY } = process.env;

const genAIService = async (content, ext) => {
  try {
    const genAI = new GoogleGenerativeAI(GEN_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a code expert. Please review the following ${ext} file content and suggest improvements. 
    After explaining how to improve the code, please update the code with your suggestions. 
    Here is the content: ${content}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error processing the ai service:", error);
  }
};

module.exports = { genAIService };
