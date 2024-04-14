const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const Order = require('./order');
const Product_Variant = require('./product_variant');

const Order_Item = sequelize.define('Order_Item', {
	order_id: { type: DataTypes.CHAR(14), primaryKey: true },
	product_variant_id: { type: DataTypes.INTEGER, primaryKey: true },
	order_item_index: { type: DataTypes.INTEGER, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	quantity: { type: DataTypes.INTEGER, allowNull: false },
	total_value: { type: DataTypes.INTEGER, allowNull: false },
}, {
	timestamps: false,
})

Order.belongsToMany(Product_Variant, {
	through: Order_Item,
	foreignKey: 'order_id',
	otherKey: 'product_variant_id'
});
Product_Variant.belongsToMany(Order, {
	through: Order_Item,
	foreignKey: 'product_variant_id',
	otherKey: 'order_id'
});

Order.hasMany(Order_Item, {
	foreignKey: { name: 'order_id', type: DataTypes.CHAR(14) }
});
Order_Item.belongsTo(Order, {
	foreignKey: { name: 'order_id', type: DataTypes.CHAR(14) }
});

Product_Variant.hasMany(Order_Item, {
	foreignKey: { name: 'product_variant_id', type: DataTypes.INTEGER }
});
Order_Item.belongsTo(Product_Variant, {
	foreignKey: { name: 'product_variant_id', type: DataTypes.INTEGER }
});

module.exports = Order_Item;
