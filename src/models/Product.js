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
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    price:{
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    }, 
    barCode:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },      
},{timestamps: false})


