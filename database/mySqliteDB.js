const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
	host: "localhost",
	dialect: "sqlite",
});

const connection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		return true;
	} catch (error) {
		console.error("Unable to connect to the database:", error);

		return error;
	}
};

module.exports = { sequelize, connection };