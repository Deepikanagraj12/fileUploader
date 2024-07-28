const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload , videoUpload, imageCompressor} = require("../contollers/fileUpload")

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageCompressor", imageCompressor);

module.exports = router;