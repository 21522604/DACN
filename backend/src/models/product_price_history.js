const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const Product = require('./product');

const Product_Price_History = sequelize.define('Product_Price_History', {
	product_id: { type: DataTypes.INTEGER, primaryKey: true },
	created_at: { type: DataTypes.DATE, defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), primaryKey: true },
	price: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
	timestamps: false,
})

Product.hasMany(Product_Price_History, {
	foreignKey: { name: 'product_id', type: DataTypes.INTEGER }
});
Product_Price_History.belongsTo(Product, {
	foreignKey: { name: 'product_id', type: DataTypes.INTEGER }
});

module.exports = Product_Price_History;
