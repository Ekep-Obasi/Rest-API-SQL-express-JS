const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Drink = sequelize.define(
  "drink",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    recipe: DataTypes.STRING,
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Drink;
