const { Sequelize } = require("sequelize");

//nos conectmos a la base de datos.
const sequelize = new Sequelize("libraryadmin", "root", "root", {
  host: "localhost",
  dialect: "mysql",
})

const db = {}

db.sequelize = sequelize;

//Exporto objeto db con la xonexion de sequelize
//usado para definir modelos.
module.exports = db;
