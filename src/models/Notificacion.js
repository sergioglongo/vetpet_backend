const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Notificacion',{
    idNotificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    asunt:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    body:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dateCreation:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },    
    dateSend:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    enable:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
},{timestamps: false})

