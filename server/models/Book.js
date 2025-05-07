const { DataTypes } = require("sequelize");
const db = require("../db")

const Book = db.sequelize.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    publicatioYear: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);

module.exports = Book;
