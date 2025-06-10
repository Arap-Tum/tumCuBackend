const express = require("express");
const router = express();

const upload = require("../middlewares/multer.js");

const {
  addBook,
  getAllTHeBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/libraryControllers.js");

router.post("/", upload.single("image"), addBook);
router.get("/", getAllTHeBooks);
router.get("/:id", getBookById);
router.put("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
