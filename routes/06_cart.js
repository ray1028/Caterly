const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT items.name, quantity, price
      FROM orders_items JOIN orders ON orders.id = order_id 
      JOIN items ON items.id = item_id WHERE orders.id = 1 ;`
    )
      .then(data => {
        const customers = data.rows;
        res.json({ customers });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
