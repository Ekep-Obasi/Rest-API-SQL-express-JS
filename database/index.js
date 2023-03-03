const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("drinks_db", "root", undefined, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
