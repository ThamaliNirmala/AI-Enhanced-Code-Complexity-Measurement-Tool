const path = require("path");
const fileService = require("../services/fileService");
const { extname } = require("path");

exports.analyzeFile = async (req, res) => {
  const file = req.file;
  const filePath = path.join(__dirname, "../uploads/", file.filename);

  // Get the file extension
  const fileExtension = extname(file.filename).toLowerCase();

  if (![".py", ".js", ".jsx", ".java"].includes(fileExtension))
    return res.status(500).send({ message: "Unsupported File Type Provided" });

  try {
    let complexityReport;

    if (fileExtension === ".js" || fileExtension === ".jsx") {
      // Analyze JavaScript code complexity
      complexityReport = await fileService.analyzeJavaScript(filePath);
    } else if (fileExtension === ".py") {
      // Analyze Python code complexity
      complexityReport = await fileService.analyzePython(filePath);
    } else if (fileExtension === ".java") {
      // Analyze Java code complexity
      complexityReport = await fileService.analyzeJavaCode(filePath);
    }

    // Remove the uploaded file after analysis
    await fileService.removeFile(filePath);

    return res.send({
      filename: file.originalname,
      complexity: complexityReport,
      fileExtension,
    });
  } catch (error) {
    console.error("Error processing the file:", error);
    res.status(500).send("An error occurred while processing the file.");
  }
};
