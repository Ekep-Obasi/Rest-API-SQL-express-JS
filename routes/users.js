const express = require("express");
const bycrypt = require("bcrypt");
const uuid = require("uuid");
const Drink = require("../database/Model/drink");
const User = require("../database/Model/users");
const SALT_ROUNDS = require("../constants");
const router = express.Router();
router.get("/", async function (_, res) {
  const users = await User.findAll({ include: Drink });
  res.send(users);
});

router.post("/", function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  bycrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
    console.log(hash);
    if (err) res.status(500).send(err);
    else {
      const user = await User.create({
        firstName,
        lastName,
        emailAddress,
        phone,
        password: hash,
        apiKey: uuid.v4(),
      });
      res.send(user);
    }
  });
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
