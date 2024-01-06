const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Sequelize');
const InformacionPersonal = require('./InfoPersonal.model')
const Colonia = require('./Colonia.model');
const Municipio = require('./Municipio.model');
const Estado = require('./Estado.model');

const Residencia = sequelize.define('Residencia', {
    Direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo Direccion no puede ser nulo.",
            },
        },
    },
    Numero: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo Numero no puede estar vacio.",
            },
        },
    },
});

Residencia.belongsTo(InformacionPersonal, { foreignKey: 'IDUsuario', primaryKey: true });
Residencia.belongsTo(Colonia, { foreignKey: 'IDColonia' });
Residencia.belongsTo(Municipio, { foreignKey: 'IDMunicipio' });
Residencia.belongsTo(Estado, { foreignKey: 'IDEstado' });

module.exports = Residencia;
