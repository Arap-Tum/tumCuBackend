const express = require("express");
const router = express();

const {
  addMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../controllers/membersControllers.js");

router.post("/", addMember);
router.get("/", getMembers);
router.get("/:id", getMemberById);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;
