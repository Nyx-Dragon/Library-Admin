const port = 8000;

const cors = require("cors");
const express = require("express");
const db = require("./db");

const booksRouter = require("./routes/books.routes");
const membersRoutes = require("./routes/member.routes");
const loansRoutes = require("./routes/loans.routes");
const usersRoutes = require("./routes/users.routes");

const { authMiddleware } = require("./middlewares/auth");

const main = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Sincronizar la base de datos
    db.sequelize.sync().then(() => {
        console.log("Re-sync db.");
    });

    // Definir rutas
    app.use("/", usersRoutes);
    app.use("/books", booksRouter);
    app.use("/members", membersRoutes);
    app.use("/loans", authMiddleware, loansRoutes);

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};

main();
