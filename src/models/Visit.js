const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => 
sequelize.define('Visit',{
    idVisit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado:{
        type: DataTypes.ENUM,
        values: ['Asistio','Ausente','Cancelada','Reprogramada'],
        defaultValue:"Asistio",
    },            
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    fechaVisit:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    observations: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},{timestamps: false})


