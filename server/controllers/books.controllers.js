const Book = require("../models/Book")

const getBooks = (req, res) => {
    res.send("Test")
}

const createBook = async (req, res) => {
    const createdBook = await Book.create({title: "Cinco semanas en globo", description: "Hola", length: 350})
    res.send(createdBook.id)
}

exports.getBooks = getBooks
exports.createBook = createBook