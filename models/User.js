const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define("blog", {

    userid:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true // createdAt ve updatedAt alanlarını otomatik ekler
});

module.exports = User;