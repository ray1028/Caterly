const express = require("express");
const router = express.Router();

module.exports = db => {
  let templateVars = {};

  router.get("/:id", (req, res) => {
    const queryStrHeader = `
    SELECT first_name, last_name FROM customers
      WHERE id = $1
    `;
    const values = [req.session.user_id];
    db.query(queryStrHeader, values)
      .then(data => {
        templateVars.user = `${data.rows[0].first_name}`;
        db.query(
          `SELECT restaurants.name as name, categories.name as category, restaurants.id as restaurant_id FROM restaurants JOIN categories ON category_id = categories.id WHERE categories.name = '${req.params.id}';`
        )
          .then(data => {
            if (data.rowCount === 0) {
              res.send("error");
              console.log("DNE");
            } else {
              templateVars.restaurants = data.rows;
              console.log(data);
              console.log(data.rows);
              // res.json({ restaurants });
              console.log(templateVars);
              res.render("categories", templateVars);
            }
          })
          .catch(err => {
            res.status(500).json({ error: err.message });
          });

      });

    console.log(req.params.id);

  });

  return router;
};
