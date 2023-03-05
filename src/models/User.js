const { DataTypes } = require('sequelize')

module.exports = (sequelize) =>
    sequelize.define('User', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mailUser: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        avatarLink: {
            type: DataTypes.STRING,
            defaultValue: 'https://innostudio.de/fileuploader/images/default-avatar.png'
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }

    }, { timestamps: false })

