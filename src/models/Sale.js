const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Sale',{
    idSale: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    total:{
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    pay:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    saleDate:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    }
},{timestamps: false})

