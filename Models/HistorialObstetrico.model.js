const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Sequelize');
const InformacionPersonal = require('./InfoPersonal.model');

const HistorialObstetrico = sequelize.define('HistorialObstetrico', {
    FUR: DataTypes.DATE,
    NumeroEmbarazos: DataTypes.INTEGER,
    NumeroPartos: DataTypes.INTEGER,
    NumeroCesareas: DataTypes.INTEGER,
    NumeroLegrados: DataTypes.INTEGER,
    ComplicacionesPartoCesarea: DataTypes.STRING(255),
    ComplicacionesEmbarazosAnteriores: DataTypes.STRING(255),
    DiabetesGestacional: DataTypes.ENUM('Sí', 'No'),
    PesoBebeAnterior: DataTypes.DECIMAL(5, 2),
    AntecedentesFamiliaresComplicacionesEmbarazo: DataTypes.STRING(255),
});

HistorialObstetrico.belongsTo(InformacionPersonal, { foreignKey: 'IDUsuario', primaryKey: true });

module.exports = HistorialObstetrico;