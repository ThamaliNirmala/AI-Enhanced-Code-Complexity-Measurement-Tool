const express = require("express");
const router = express.Router();
const multer = require("multer");
const { analyzeFile } = require("../controllers/fileUploadController");

// Set up storage configuration with original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  },
});

// Create the multer instance with the custom storage
const upload = multer({ storage: storage });

router.post("/files/upload", upload.single("file"), analyzeFile);

module.exports = router;
