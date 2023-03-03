const sequelize = require(".");
const Category = require("./Model/category");
const Drink = require("./Model/drink");
const Glass = require("./Model/glass");
const Ingredient = require("./Model/ingredient");
const User = require("./Model/users");

function relate() {
  sequelize.sync();

  User.hasMany(Drink);
  Drink.belongsTo(User);

  Drink.belongsToMany(Category, { through: "drinks_categories" });
  Category.belongsToMany(Drink, { through: "drinks_categories" });

  Drink.belongsToMany(Ingredient, { through: "drinks_ingredients" });
  Ingredient.belongsToMany(Drink, { through: "drinks_categories" });

  Drink.belongsToMany(Glass, { through: "drinks_glasses" });
  Glass.belongsToMany(Drink, { through: "drinks_categories" });

  sequelize.sync();
}

module.exports = relate;
