const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('Veterinarian',{
    idVeterinarian: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameVeterinarian:{
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
    },
    identification:{
        type: DataTypes.STRING,
        allowNull: false,
    },   
},{timestamps: false})

