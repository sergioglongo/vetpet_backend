const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('Administrator',{
    idAdministrator: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameAdministrator:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{timestamps: false})

