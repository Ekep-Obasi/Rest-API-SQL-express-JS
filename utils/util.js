function groupUsersDrinks(rows) {
  const users = {};
  const ids = new Set();
  rows.forEach(({ id, name, email, phone, ...drink }) => {
    if (users[id]) {
      users[id].drinks.push(drink);
    } else {
      users[id] = { id, name, email, phone, drinks: [drink] };
    }
    ids.add(id);
  });

  return Array.from(ids).map((id) => users[id]);
}

module.exports = groupUsersDrinks;
