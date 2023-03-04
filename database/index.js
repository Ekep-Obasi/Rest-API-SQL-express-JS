const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("drinksdb", "ekepobasi", "drinksdb123", {
  host: "db4free.net",
  dialect: "mysql",
});

module.exports = sequelize;
