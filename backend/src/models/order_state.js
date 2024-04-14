const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Order_State = sequelize.define('Order_State', {
    state_id: { type: DataTypes.INTEGER, primaryKey: true },
    state_name: { type: DataTypes.STRING, unique: true, allowNull: false }
}, {
    timestamps: false
})

module.exports = Order_State;
