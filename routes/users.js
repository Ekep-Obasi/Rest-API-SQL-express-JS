var express = require("express");
const {
  getAllUsers,
  findUserById,
  createOneUser,
  patchOneUser,
  deleteOneUser,
  updateOne,
} = require("../database/users");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res) {
  const users = await getAllUsers();
  res.send(users);
});

router.post("/", async function (req, res) {
  const { NAME, email, phone, api_key, password } = req.body;
  if (NAME && email && phone && api_key && password) {
    const id = await createOneUser(NAME, email, phone, api_key, password);
    const user = await findUserById(id);
    res.send(user);
  }
  res.send({ message: "Operation Failed" });
});

router.get("/:id", async function (req, res) {
  const user = await findUserById(req.params.id);
  res.send(user);
});

router.put("/:id", async function (req, res) {
  const { NAME, email, phone, api_key, password } = req.body;
  if ((NAME, email, phone, api_key, password)) {
    updateOne(NAME, email, phone, api_key, password, req.params.id);
    const user = await findUserById(req.params.id);
    res.send(user);
  }
  res.send({ message: "Write Error" });
});

router.patch("/:id", async function (req, res) {
  await patchOneUser(req.body, +req.params.id);
  const user = await findUserById(req.params.id);
  res.send(user);
});

router.delete("/:id", async function (req, res) {
  await deleteOneUser(req.params.id);
  res.send({ message: "Operation successful" });
});

module.exports = router;
