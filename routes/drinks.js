const express = require("express");
const Drink = require("../database/Model/drink");
const router = express.Router();

router.get("/", async (_, res) => {
  const drink = await Drink.findAll();
  res.send(drink);
});

router.post("/", async (req, res) => {
  const drink = await Drink.create(req.body);
  res.send(drink);
});

router.get("/:id", async (req, res) => {
  const drink = await Drink.findByPk(req.params.id);
  res.send(drink);
});

router.put("/:id", async (req, res) => {
  const { name, description, imageUrl, recipe } = req.body;
  if (name && description && imageUrl && recipe) {
    await Drink.update(req.body, { where: { id: req.params.id } });
    const drink = await Drink.findByPk(req.params.id);
    res.send(drink);
  }
  res.send({ message: "validation failed!" });
});

router.patch("/:id", async (req, res) => {
  await Drink.update(req.body, { where: { id: req.params.id } });
  const drink = await Drink.findByPk(req.params.id);
  res.send(drink);
});

router.delete("/:id", (req, res) => {
  Drink.destroy({ where: { id: req.params.id } });
  res.send({ status: "Success" });
});

module.exports = router;
