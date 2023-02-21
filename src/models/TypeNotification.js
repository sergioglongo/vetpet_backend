const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('TypeNotification',{
    idTypeNotification: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    typeNotification:{
        type: DataTypes.STRING,
    },    
},{timestamps: false})


