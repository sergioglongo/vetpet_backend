const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => sequelize.define('Appointment',{
    idAppointment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reason:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateAppointment:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    dateCreate:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    }
},{timestamps: false})


