const { DataTypes } = require("sequelize");
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

module.exports = Loan;
