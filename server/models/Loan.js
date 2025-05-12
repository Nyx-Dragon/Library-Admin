// models/loans.js
const { DataTypes } = require("sequelize");
const db = require("../db");
const Book = require("../models/Book");
const Member = require("../models/Member");
const Loan = db.sequelize.define("Loan", {
    returnDate: {
        type: DataTypes.DATE,
    },
    loan_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
Book.hasMany(Loan);
Loan.belongsTo(Book);

Member.hasMany(Loan);
Loan.belongsTo(Member);
module.exports = Loan;
