const fs = require("fs");
const plato = require("plato");
const path = require("path");
const { execFile, exec } = require("child_process");
const babel = require("@babel/core");

const TEMP_UPLOADS_DIR = path.join(__dirname, "../uploads/");
const PMD_DIR = "C:\\pmd-bin-7.5.0";

//To Support Modern JS
const preprocessJavaScript = (filePath) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = filePath.replace(".js", ".babel.js");

    babel.transformFile(filePath, (err, result) => {
      if (err)
        return reject(
          new Error(`Error preprocessing the JavaScript file: ${err.message}`)
        );

      fs.writeFile(tempFilePath, result.code, (writeErr) => {
        if (writeErr)
          return reject(
            new Error(
              `Error writing the preprocessed JavaScript file: ${writeErr.message}`
            )
          );

        resolve(tempFilePath);
      });
    });
  });
};

// Analyze JavaScript code complexity
const analyzeJavaScript = (filePath) => {
  return preprocessJavaScript(filePath).then((preprocessedFilePath) => {
    return new Promise((resolve, reject) => {
      const reportDir = path.join(TEMP_UPLOADS_DIR, "reports");
      fs.mkdir(reportDir, { recursive: true }, (mkdirErr) => {
        if (mkdirErr)
          return reject(new Error("Error creating the report directory"));

        plato.inspect([preprocessedFilePath], reportDir, {}, (report) => {
          const reportFile = path.join(reportDir, "report.json");
          fs.readFile(reportFile, "utf8", (readErr, reportData) => {
            if (readErr)
              return reject(new Error("Error reading the Plato report"));

            fs.rmdir(reportDir, { recursive: true }, (rmdirErr) => {
              if (rmdirErr)
                console.error("Error deleting the report directory:", rmdirErr);
            });

            fs.unlink(preprocessedFilePath, (err) => {
              if (err)
                return reject(
                  new Error("Error deleting the file: " + err.message)
                );
              resolve();
            });

            resolve(JSON.parse(reportData));
          });
        });
      });
    });
  });
};

// Analyze Python code complexity - pip install radon
const analyzePython = (filePath) => {
  return new Promise((resolve, reject) => {
    const reportFile = path.join(TEMP_UPLOADS_DIR, "radon-report.txt");

    execFile(
      "radon",
      ["cc", filePath, "-a"],
      { cwd: TEMP_UPLOADS_DIR },
      (error, stdout, stderr) => {
        if (error)
          return reject(new Error(`Error executing radon: ${error.message}`));
        if (stderr) console.error(`stderr: ${stderr}`);

        fs.writeFile(reportFile, stdout, (writeErr) => {
          if (writeErr)
            return reject(new Error("Error writing the Radon report"));

          fs.readFile(reportFile, "utf8", (readErr, reportData) => {
            if (readErr)
              return reject(new Error("Error reading the Radon report"));

            fs.unlink(reportFile, (unlinkErr) => {
              if (unlinkErr)
                console.error("Error deleting the report file:", unlinkErr);
            });

            function convertToMarkdown(reportData) {
              const lines = reportData.split("\r\n");

              // Extract and process the file path and summary
              const filePath = lines[0].split("\\").pop();
              const summaryLines = lines.slice(-3);
              const analysisLines = lines.slice(1, -3);

              // Convert analysis lines to Markdown
              const markdownLines = analysisLines
                .map((line) => {
                  const match = line.match(/(\d+):(\d+) (\S+) - ([A-Z])/);
                  if (match) {
                    const [_, lineNumber, , methodName, grade] = match;
                    return `- **Line ${lineNumber}**: \`${methodName}\` - Grade ${grade}`;
                  }
                  return "";
                })
                .filter((line) => line.trim() !== "");

              // Process summary lines for total blocks and average complexity
              const totalBlocksMatch = summaryLines[0].match(/(\d+) blocks/);
              const averageComplexityMatch = summaryLines[1].match(
                /Average complexity: ([A-Z]) \(([\d.]+)\)/
              );

              const totalBlocks = totalBlocksMatch
                ? totalBlocksMatch[1]
                : "N/A";
              const averageComplexityGrade = averageComplexityMatch
                ? averageComplexityMatch[1]
                : "N/A";
              const averageComplexityValue = averageComplexityMatch
                ? averageComplexityMatch[2]
                : "N/A";

              // Construct Markdown content
              return `## File: ${filePath}\n\n### Analyzed Blocks\n\n${markdownLines.join(
                "\n"
              )}\n\n---\n\n**Summary**\n\n- **Total Analyzed Blocks**: ${totalBlocks}\n- **Average Complexity**: Grade ${averageComplexityGrade} (${averageComplexityValue})`;
            }

            // Convert and print the Markdown content
            const markdownContent = convertToMarkdown(reportData);

            resolve(markdownContent);
          });
        });
      }
    );
  });
};

const analyzeJavaCode = (filePath) => {
  return new Promise((resolve, reject) => {
    const reportFile = path.join(TEMP_UPLOADS_DIR, "pmd-report.xml");

    const pmdCommand = `"${PMD_DIR}\\bin\\pmd.bat"  check -d "${filePath}" -R rulesets/java/quickstart.xml -r "${reportFile}"`;

    exec(pmdCommand, (error, stdout, stderr) => {
      // if (error)
      //   return reject(new Error(`Error executing PMD: ${error.message}`));
      // if (stderr) return reject(new Error(`PMD STDERR: ${stderr}`));

      fs.readFile(reportFile, "utf8", (readErr, reportData) => {
        if (readErr)
          return reject(
            new Error(`Error reading the PMD report: ${readErr.message}`)
          );
        fs.unlink(reportFile, (unlinkErr) => {
          if (unlinkErr)
            console.error("Error deleting the report file:", unlinkErr);
        });

        const markdownContent = reportData
          .split("\r\n")
          .map((line) => {
            const [filePath, lineNumber, rule] = line.split("\t");
            if (lineNumber && rule)
              return `### ${filePath
                .split("\\")
                .pop()} Line ${lineNumber}\n**Rule**: ${rule}\n`;
            return "";
          })
          .filter((line) => line.trim() !== "")
          .join("\n\n");
        resolve(markdownContent);
      });
    });
  });
};

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(new Error("Error deleting the file"));
      } else {
        resolve(data);
      }
    });
  });
};

const removeFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(new Error("Error deleting the file"));
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  analyzeJavaScript,
  analyzePython,
  analyzeJavaCode,
  readFile,
  removeFile,
};
