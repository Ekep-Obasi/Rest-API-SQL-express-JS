const express = require("express");
const Category = require("../database/Model/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = await Category.findAll();
  res.send(category);
});

router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    await Category.update(req.body, { where: { id: req.params.id } });
    const category = await Category.findByPk(req.params.id);
    res.send(category);
  }
  res.send({ message: "validation failed!" });
});

router.patch("/:id", async (req, res) => {
  await Category.update(req.body, { where: { id: req.params.id } });
  const category = await Category.findByPk(req.params.id);
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  Category.destroy({ where: { id: req.params.id } });
  res.send({ status: "success" });
});

module.exports = router;
