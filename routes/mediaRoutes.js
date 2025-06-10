const express = require("express");
const router = express();

const upload = require("../middlewares/multer.js");

const {
  addMediaItem,
  getAllMediaItem,
} = require("../controllers/mediaControllers.js");

router.post("/media", upload.single("image"), addMediaItem);
router.get("media", getAllMediaItem);

module.exports = router;
