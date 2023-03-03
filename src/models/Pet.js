const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {

    sequelize.define('Pet', {
        idPet: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        namePet: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identification: {
            type: DataTypes.STRING,
            allowNull: true,
        },        
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: '0'
        },
        birthdate:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        }
    }, { timestamps: false })
}
