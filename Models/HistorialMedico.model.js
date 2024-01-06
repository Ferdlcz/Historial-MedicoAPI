const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Sequelize');
const InformacionPersonal = require('./InfoPersonal.model');

const HistorialMedico = sequelize.define('HistorialMedico', {
    
    AntecedentesEnfermedades: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo Antecedetes de enfermedades no puede estar vacio.",
            },
        },
    },
    
    AntecedentesHereditarios: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo Antecedentes Hereditarios no puede estar vacio.",
            },
        },
    },
    
    ConsumoAlcohol: {
        type: DataTypes.ENUM('Nunca', 'Ocasional', 'Frecuente'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debes seleccionar una opcion en el campo Consumo de alcohol.",
            },
        },
    },
    
    ConsumoTabaco: {
        type: DataTypes.ENUM('Nunca', 'Ocasional', 'Frecuente'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Debes seleccionar una opcion en el campo Consumo de tabaco.",
            },
        },
    },
    
    Alergias: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo Antecedentes Hereditarios no puede estar vacio.",
            },
        },
    },
    
});

HistorialMedico.belongsTo(InformacionPersonal, {foreignKey: 'IDUsuario', primaryKey: true });

module.exports = HistorialMedico;