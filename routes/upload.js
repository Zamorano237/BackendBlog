const express = require("express");
const router = express.Router();
const path = require("path");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileUpload = require("express-fileupload");

router.post(
  "/",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "..", "files", files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

router.get("/:url", (req, res) => {
  const { url } = req.params;
  res.sendFile(path.join(__dirname, "..", "files", `${url}`));
});

module.exports = router;
