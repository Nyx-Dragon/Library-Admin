const { DataTypes } = require("sequelize");
const Book = require("../models/Book")
const Member = require("../models/Member");
const db = require("../db");

const Loan = db.sequelize.define(
  "Loan",
  {
    returnDate: {
      type: DataTypes.DATE,
    },
    loan_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {}
);

Book.hasMany(Loan)
Loan.belongsTo(Book)

Member.hasMany(Loan)
Loan.belongsTo(Member)
module.exports = Loan;
