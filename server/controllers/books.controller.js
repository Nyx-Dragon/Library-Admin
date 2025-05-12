const Book = require("../models/Book");
const Loan = require("../models/Loan");
const Member = require("../models/Member");

// Obtener todos los libros
const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros", error });
  }
};

// Crear un nuevo libro
const createBook = async (req, res) => {
  try {
    const { title, description, author, publicationYear, ISBN } = req.body;
    const createdBook = await Book.create({
      title,
      description,
      author,
      publicationYear,
      ISBN,
    });

    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el libro", error });
  }
};
const deleteBook = async (req, res) => {
    const { id } = req.params; // Obtener el ID del libro desde los parámetros de la URL
    try {
      const book = await Book.findByPk(id); // Buscar el libro por su ID
      if (!book) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      await book.destroy(); // Eliminar el libro
      res.status(200).json({ message: "Libro eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el libro", error });
    }
  };
  

exports.deleteBook = deleteBook;
exports.getBooks = getBooks;
exports.createBook = createBook;
