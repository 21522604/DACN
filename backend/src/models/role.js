const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Role = sequelize.define('Role', {
    role_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role_name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    timestamps : false
})

module.exports = Role;
