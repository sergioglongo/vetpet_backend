const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => sequelize.define('Client', {
  idClient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameClient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificationType: {
    type: DataTypes.STRING,
    allowNull: false,
  },     
  identification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['identificationType', 'identification'],
    },
  ],
});
