const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("libraryadmin", "root", "root", {
  host: "localhost",
  dialect: "mysql",
})

const db = {}

db.sequelize = sequelize;

module.exports = db;
