const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Sequelize');

const Colonia = sequelize.define('Colonia', {
    IDColonia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo Nombre no puede estar vacio.",
            },
        },
    },
});

module.exports = Colonia;