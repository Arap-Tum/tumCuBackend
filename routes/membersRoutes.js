const express = require("express");
const router = express();
const multer = require("multer");
const upload = multer();

const {
  validateAddingMember,
  validateUpdateMember,
} = require("../middlewares/membersValidation.js");

const {
  addMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../controllers/membersControllers.js");

router.post("/", upload.none(), validateAddingMember, addMember);
router.get("/", getMembers);
router.get("/:id", getMemberById);
router.put("/:id", upload.none(), validateUpdateMember, updateMember);
router.delete("/:id", deleteMember);

module.exports = router;
