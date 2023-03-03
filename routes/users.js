const express = require("express");
const Drink = require("../database/Model/drink");
const User = require("../database/Model/users");
const router = express.Router();

router.get("/", async function (_, res) {
  const users = await User.findAll({ include: Drink });
  res.send(users);
});

router.post("/", async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    emailAddress,
    phone,
    password,
    apiKey: Date.now(),
  });
  res.send(user);
});

router.get("/:id", async function (req, res) {
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.put("/:id", async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  if (firstName && lastName && emailAddress && phone && password) {
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id);
    res.send(user);
  }
  res.send({ message: "all feild required" });
});

router.patch("/:id", async function (req, res) {
  await User.update(req.body, { where: { id: req.params.id } });
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.delete("/:id", async function (req, res) {
  await User.destroy({ where: { id: req.params.id } });
  res.send({ status: "success" });
});

module.exports = router;
