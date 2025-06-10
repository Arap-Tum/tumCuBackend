const express = require("express");
const router = express();

const upload = require("../middlewares/multer.js");

const {
  addLeader,
  getLeaders,
  getLeaderById,
  updateLeader,
  deleteLeader,
} = require("../controllers/leadersControllers.js");

router.post("/", upload.single("image"), addLeader);
router.get("/", getLeaders);
router.get("/:id", getLeaderById);
router.put("/:id", upload.single("image"), updateLeader);
router.delete("/:id", deleteLeader);

module.exports = router;
