const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('User',{
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user:{
        type: DataTypes.STRING,
        allowNull: false,
    },    
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mailUser:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{timestamps: false})

