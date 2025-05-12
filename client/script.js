const API_URL = "http://localhost:8000/books";

const bookList = document.getElementById("bookList");
const bookForm = document.getElementById("bookForm");

const loadBooks = async () => {
  bookList.innerHTML = "Cargando libros...";
  try {
    const res = await fetch(API_URL);
    const books = await res.json();

    // Mostrar la respuesta para depurar
    console.log(books); 

    // Asegurarse de que books es un arreglo
    if (Array.isArray(books)) {
      bookList.innerHTML = "";
      books.forEach((book) => {
        const div = document.createElement("div");
        div.className = "book";
        div.innerHTML = `
          <strong>${book.title}</strong> (${book.author})<br>
          <em>${book.description || "Sin descripción"}</em><br>
          <em>${book.publicationYear || "Sin Año especificado"}</em><br>
          <button onclick="deleteBook(${book.id})">Eliminar</button>
        `;
        bookList.appendChild(div);
      });
    } else {
      throw new Error("La respuesta no es un arreglo");
    }
  } catch (error) {
    console.error("Error al cargar los libros:", error);
    bookList.innerHTML = "Hubo un error al cargar los libros.";
  }
};

const addBook = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author")
  
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, author }),
  });

  bookForm.reset();
  loadBooks();
};

const deleteBook = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  loadBooks();
};

bookForm.addEventListener("submit", addBook);
loadBooks();