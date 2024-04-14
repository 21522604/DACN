const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const sequelize = new Sequelize('clothes-web-shop', 'root', null, { host: 'localhost', dialect: 'mysql', logging: false });
//, logging: false

module.exports = {
	sequelize,
	connect: async () => {
		try {
			const connection = await mysql.createConnection({
				host: "localhost",
				user: "root",
				password: null,
			});

			await connection.query(
				'CREATE DATABASE IF NOT EXISTS `clothes-web-shop`'
			);

			await connection.end();

			await sequelize.authenticate();
			console.log('Connection has been established successfully.');
			await sequelize.sync();
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	}
}