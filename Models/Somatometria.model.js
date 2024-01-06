const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Sequelize');
const InformacionPersonal = require('./InfoPersonal.model');

const Somatometria = sequelize.define('Somatometria', {
    Peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Peso no puede estar vacio.',
            },
            min: {
                args: [0],
                msg: 'El campo Peso debe ser mayor o igual a cero.',
            },
        },
    },
    Talla: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Talla no puede  estar vacio.',
            },
            min: {
                args: [0],
                msg: 'El campo Talla debe ser mayor o igual a cero.',
            },
        },
    },
    TA: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo TA no puede estar vacio.',
            },
            len: {
                args: [1, 10],
                msg: 'El campo TA debe tener entre 1 y 10 caracteres.',
            },
        },
    },
    SPO2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo SPO2 no puede estar vacio.',
            },
            min: {
                args: [0],
                msg: 'El campo SPO2 debe ser mayor o igual a cero.',
            },
        },
    },
    Temperatura: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Temperatura no puede estar vacio.',
            },
        },
    },
});

Somatometria.belongsTo(InformacionPersonal, { foreignKey: 'IDUsuario', primaryKey: true });

module.exports = Somatometria;