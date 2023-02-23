const {DataTypes} = require ('sequelize')

module.exports = (sequelize) =>
 sequelize.define('Vaccine',{
    idVaccine: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameVaccine:{
        type: DataTypes.STRING,
    },    
    description:{
        type: DataTypes.STRING,
    }
},{timestamps: false})


