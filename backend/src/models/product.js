const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
	product_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	product_name: DataTypes.STRING,
	description: DataTypes.TEXT,
	rating: { type: DataTypes.FLOAT, defaultValue: 0 },
	sold: { type: DataTypes.INTEGER, defaultValue: 0 },
	feedback_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: false,
	paranoid: true,
	deletedAt: 'deleted_at'
})

Category.hasMany(Product, {
	foreignKey: { name: 'category_id', type: DataTypes.INTEGER, allowNull: false }
});
Product.belongsTo(Category, {
	foreignKey: { name: 'category_id', type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Product;
