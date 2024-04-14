const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const User = require('./user');

const Order = sequelize.define('Order', {
	order_id: { type: DataTypes.CHAR(14), primaryKey: true },
	customer_name: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false },
	phone_number: { type: DataTypes.STRING, allowNull: false },
	address: { type: DataTypes.STRING, allowNull: false },
	total_product_value: { type: DataTypes.INTEGER, allowNull: false },
	delivery_charges: { type: DataTypes.INTEGER, allowNull: false },
	total_order_value: { type: DataTypes.INTEGER, allowNull: false },
}, {
	timestamps: false,
});

User.hasMany(Order, {
	foreignKey: { name: 'user_id', type: DataTypes.UUID, allowNull: false }
});
Order.belongsTo(User, {
	foreignKey: { name: 'user_id', type: DataTypes.UUID, allowNull: false }
});

module.exports = Order;
