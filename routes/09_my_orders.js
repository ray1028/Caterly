const express = require("express");
const router = express.Router();
const strftime = require("strftime");

const formatDate = function(epoch) {
  return strftime("%F %T", new Date(parseInt(epoch)));
};

module.exports = db => {
  router.get("/", (req, res) => {
    const templateVars = { formatDate: formatDate };
    const queryStrHeader = `
    SELECT first_name, last_name FROM customers
      WHERE id = $1
    `;
    const values = [req.session.user_id];

    db.query(queryStrHeader, values).then(data => {
      templateVars.user = `${data.rows[0].first_name}`;

      const myOrdersQuery = `
      SELECT customer_id, restaurant_id, created_at, pickup_time, order_total, restaurants.name as name FROM orders JOIN restaurants ON 
      restaurants.id = restaurant_id JOIN customers ON customer_id = customers.id WHERE customers.id = $1 `;

      db.query(myOrdersQuery, values).then(data2 => {
        templateVars.orders = data2.rows;

        console.log(data2);

        res.render("my_orders", templateVars);
      });
    });
  });

  return router;
};
