const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('TypeUser',{
    idTypeUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    typeUser:{
        type: DataTypes.STRING,
        allowNull: false,
    },    
},{timestamps: false})


