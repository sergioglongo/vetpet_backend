const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Vaccination',{
    idVaccination: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dosage: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    date:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    }
},{timestamps: false})


