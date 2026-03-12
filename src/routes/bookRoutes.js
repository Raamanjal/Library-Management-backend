const express = require("express");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/search", searchBooks); 
router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
