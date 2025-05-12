const express = require("express");
const booksController = require("../controllers/books.controller")
const router = express.Router();

router.get("/", booksController.getBooks);
router.delete("/:id", booksController.deleteBook);
router.post("/", booksController.createBook);

module.exports = router;