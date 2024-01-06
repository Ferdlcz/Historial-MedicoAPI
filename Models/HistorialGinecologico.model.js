const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Sequelize');
const InformacionPersonal = require('./InfoPersonal.model');

const HistorialGinecologico = sequelize.define('HistorialGinecologico', {
    HistorialMenstrualDuracion: DataTypes.INTEGER,
    HistorialMenstrualRegularidad: DataTypes.STRING(50),
    MenarcaEdad: DataTypes.INTEGER,
    IVSAEdad: DataTypes.INTEGER,
    AnticonceptivoActual: DataTypes.STRING(50),
    ExamenesGinecologicosPrevios: DataTypes.STRING(255),
});

HistorialGinecologico.belongsTo(InformacionPersonal, { foreignKey: 'IDUsuario', primaryKey: true });

module.exports = HistorialGinecologico;