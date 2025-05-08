const port = 8000;

const cors = require("cors");
const express = require("express");
const db = require("./db");
const booksRouter = require("./routes/books.routes");
const membersRoutes = require("./routes/member.routes")
const loansRoutes = require("./routes/loans.routes")

const main = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  db.sequelize.sync().then(() => {
    console.log("Re-sync db.");
  });

  app.use("/books", booksRouter);
  app.use("/members", membersRoutes);
  app.use("/loans",loansRoutes);

  app.listen(port, () => {
    console.log(`App listening on ${port}`);
  });
};

main();
