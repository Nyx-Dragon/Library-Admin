const port = 8000;

const cors = require("cors");
const express = require("express");
const db = require("./db");
const authMiddleware = require("./middlewares/auth");

const booksRouter = require("./routes/books.routes");
const membersRouter = require("./routes/members.routes");
const loansRouter = require("./routes/loans.routes");
const userRoutes = require("./routes/users.routes");

const main = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    db.sequelize.sync().then(() => {
        console.log("Re-sync db.");
    });

    app.use("/books", booksRouter);
    app.use("/members", membersRouter);
    app.use("/loans", authMiddleware.authMiddleware, loansRouter);
    app.use("/", userRoutes);

    app.listen(port, () => {
        console.log(`App listening on ${port}`);
    });
};

main();
