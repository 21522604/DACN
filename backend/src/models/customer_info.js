const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const User = require('./user');

const Customer_Info = sequelize.define('Customer_Info', {
  customer_info_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  customer_name: { type: DataTypes.STRING, defaultValue: '' },
  phone_number: { type: DataTypes.STRING, defaultValue: '' },
  address: { type: DataTypes.STRING, defaultValue: '' },
}, {
  timestamps: false,
})

User.hasOne(Customer_Info, {
  foreignKey: { name: 'user_id', type: DataTypes.UUID, allowNull: false }
});
Customer_Info.belongsTo(User, {
  foreignKey: { name: 'user_id', type: DataTypes.UUID, allowNull: false }
});

module.exports = Customer_Info;
