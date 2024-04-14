const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const Order_State = require('./order_state');
const Order = require('./order');

const Order_Status_Change_History = sequelize.define('Order_Status_Change_History', {
	order_id: { type: DataTypes.CHAR(14), primaryKey: true },
	state_id: { type: DataTypes.INTEGER, primaryKey: true },
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: false
})

Order.belongsToMany(Order_State, {
	through: Order_Status_Change_History,
	foreignKey: 'order_id',
	otherKey: 'state_id'
});
Order_State.belongsToMany(Order, {
	through: Order_Status_Change_History,
	foreignKey: 'state_id',
	otherKey: 'order_id'
});

Order.hasMany(Order_Status_Change_History, {
	foreignKey: { name: 'order_id', type: DataTypes.CHAR(14) }
});
Order_Status_Change_History.belongsTo(Order, {
	foreignKey: { name: 'order_id', type: DataTypes.CHAR(14) }
});

Order_State.hasMany(Order_Status_Change_History, {
	foreignKey: { name: 'state_id', type: DataTypes.INTEGER }
});
Order_Status_Change_History.belongsTo(Order_State, {
	foreignKey: { name: 'state_id', type: DataTypes.INTEGER }
});

module.exports = Order_Status_Change_History;
