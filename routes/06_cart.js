const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT items.name as name, quantity, price, restaurants.name as restaurantName
      FROM orders_items JOIN orders ON orders.id = order_id
      JOIN items ON items.id = item_id
      JOIN restaurants on orders.restaurant_id = restaurants.id WHERE orders.id = 1 ;`
    )
      .then(data => {
        const templateVars = {
          customers: data.rows,
          restaurantname: data.rows[0].restaurantname
        };

        res.render("cart", templateVars);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
