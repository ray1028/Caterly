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
          `SELECT restaurants.name as name, categories.name as category, restaurants.id as restaurant_id, avg(ratings.rating) as rating, restaurants.image_url, restaurants.description
          FROM restaurants
          JOIN categories
          ON category_id = categories.id
          JOIN ratings
          ON restaurant_id = restaurants.id
          WHERE categories.name = '${req.params.id}'
          GROUP BY restaurants.name, categories.name, restaurants.id
          ORDER BY restaurant_id;`
        )
          .then(data => {
            if (data.rowCount === 0) {
              res.send("error");
            } else {
              templateVars.restaurants = data.rows;
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
