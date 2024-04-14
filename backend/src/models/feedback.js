const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');
const User = require('./user');
const Product_Variant = require('./product_variant');

const Feedback = sequelize.define('Feedback', {
	feedback_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	rate: { type: DataTypes.INTEGER, allowNull: false },
	content: { type: DataTypes.TEXT, defaultValue: "" },
	user_id: { type: DataTypes.UUID, allowNull: false },
	product_variant_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
})

User.hasMany(Feedback, {
	foreignKey: { name: 'user_id', type: DataTypes.UUID }
});
Feedback.belongsTo(User, {
	foreignKey: { name: 'user_id', type: DataTypes.UUID }
});

Product_Variant.hasMany(Feedback, {
	foreignKey: { name: 'product_variant_id', type: DataTypes.INTEGER }
});
Feedback.belongsTo(Product_Variant, {
	foreignKey: { name: 'product_variant_id', type: DataTypes.INTEGER }
});

module.exports = Feedback;
