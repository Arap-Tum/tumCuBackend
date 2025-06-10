const express = require("express");
const router = express();

const upload = require("../middlewares/multer.js");

const {
  addMediaItem,
  getAllMediaItem,
  getMediaItemById,
  updateMediaItem,
  deleteMediaItem,
} = require("../controllers/mediaControllers.js");

router.post("/", upload.single("image"), addMediaItem);
router.get("/", getAllMediaItem);
router.get("/:id", getMediaItemById);
router.put("/:id", upload.single("image"), updateMediaItem);
router.delete("/:id", deleteMediaItem);

module.exports = router;
