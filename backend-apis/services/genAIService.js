const axios = require("axios");
require("dotenv").config();
const { GEN_AI } = process.env;

const genAIService = async (content, ext) => {
  try {
    const payload = {
      prompt: {
        text: `You are a code expert. Please review the following ${ext} file content and suggest improvements. 
    After explaining how to improve the code, please update the code with your suggestions. 
    Here is the content: ${content}`,
      },
    };
    const result = await axios.post(GEN_AI, payload);

    return result["data"]["candidates"][0]["output"];
  } catch (error) {
    console.error("Error processing the ai service:", error);
  }
};

module.exports = { genAIService };
