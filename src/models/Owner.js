const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('Owner',{
    idOwner: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameOwner:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{timestamps: false})

