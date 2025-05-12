const { DataTypes } = require("sequelize");
const db = require("../db");

const Member = db.sequelize.define(
    "Member",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registrationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {}
);

module.exports = Member;
