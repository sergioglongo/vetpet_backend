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
        unique: true
    },    
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    mailUser:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    avatarLink: {
        type: DataTypes.STRING,
        defaultValue: 'https://example.com/default-user-image.jpg'
    }
},{timestamps: false})

