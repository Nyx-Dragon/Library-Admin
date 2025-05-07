const express = require("express");
const booksController = require("../controllers/books.controllers")
const router = express.Router();

router.get("/", booksController.getBooks);
router.post("/", booksController.createBook);

module.exports = router;