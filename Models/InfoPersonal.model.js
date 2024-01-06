const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Sequelize');

const InformacionPersonal = sequelize.define('InformacionPersonal', {
    IDUsuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Nombre no puede estar vacio.',
            },
        },
    },
    ApellidoPaterno:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Apellido paterno no puede estar vacio.',
            },
        },
    },
    ApellidoMaterno: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Apellido materno no puede estar vacio.',
            },
        },
    }, 
    FechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Fecha de nacimiento no puede estar vacio.',
            },
        },
    }, 
    Edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Edad no puede estar vacio.',
            },
        },
    }, 
    Telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Telefono no puede estar vacio.',
            },        
            min: {
                args: [0],
                msg: 'El campo Edad debe ser mayor o igual a cero.',
            },
        },
    }, 
    CorreoElectronico: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo Correo electronico no puede estar vacio.',
            },
        },
    }, 
})

module.exports = InformacionPersonal;