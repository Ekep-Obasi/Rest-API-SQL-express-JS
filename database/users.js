const connection = require(".");
const groupUsersDrinks = require("../utils/util");

async function getAllUsers() {
  const [result] = await connection.query(
    "SELECT u.id, u.NAME as name, u.email, u.phone, d.name AS drink_name, d.description AS drink_desc FROM users AS u INNER JOIN drinks AS d ON u.id = d.user_id ORDER BY u.id;"
  );
  return groupUsersDrinks(result);
}

async function findUserById(id, limit = 1) {
  const [result] = await connection.query(
    `SELECT * FROM users WHERE id = ? LIMIT ? ;`,
    [id, limit]
  );
  return result;
}

async function createOneUser(NAME, email, phone, api_key, password) {
  const [{ insertId }] = await connection.query(
    `INSERT INTO users(NAME, email, phone, api_key, password) VALUES (?, ?, ?, ?, ?)`,
    [NAME, email, phone, api_key, password]
  );
  return insertId;
}

async function patchOneUser(data, id) {
  const values = [];
  const newKeyVal = Object.keys(data)
    .map((key) => {
      values.push(data[key]);
      return `${key} = ?`;
    })
    .join(", ");
  connection.query(`UPDATE users SET ${newKeyVal} WHERE id = ?`, [
    ...values,
    id,
  ]);
}

async function updateOne(NAME, email, phone, api_key, password, id) {
  await connection.query(
    `UPDATE users SET NAME = ?, email = ?, phone = ?, api_key = ?, password = ? WHERE id = ?`,
    [NAME, email, phone, api_key, password, id]
  );
}

function deleteOneUser(id) {
  connection.query(`DELETE FROM users WHERE id = ?`, [id]);
}

module.exports = {
  getAllUsers,
  findUserById,
  createOneUser,
  patchOneUser,
  deleteOneUser,
  updateOne,
};
