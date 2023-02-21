const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('Vaccine',{
    idVaccine: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vaccine:{
        type: DataTypes.STRING,
    },    
},{timestamps: false})


