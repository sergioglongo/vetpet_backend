const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Product',{
    idProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productName:{
        type: DataTypes.STRING,
        allowNull: true,
    },     
    Description:{
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    price:{
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },   
},{timestamps: false})


