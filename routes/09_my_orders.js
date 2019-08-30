const express = require("express");
const router = express.Router();
const strftime = require("strftime");
let strftimeEST = strftime.timezone("-0400");
const formatDate = function(epoch) {
  return strftimeEST("%b %D %I:%M%p", new Date(parseInt(epoch)));
  // return strftime("%b %D %I:%M%p", new Date(parseInt(epoch)));
};

module.exports = db => {
  router.get("/", (req, res) => {
    const templateVars = {
      formatDate: formatDate
    };

    const queryStrHeader = `
    SELECT first_name, last_name FROM customers
      WHERE id = $1
    `;
    const values = [req.session.user_id];

    db.query(queryStrHeader, values).then(data => {
      templateVars.user = `${data.rows[0].first_name}`;

      const myOrdersQuery = `
      SELECT customer_id, restaurant_id, created_at, pickup_time, sum(order_total) as order_total, restaurants.name as name FROM orders JOIN restaurants ON
      restaurants.id = restaurant_id JOIN customers ON customer_id = customers.id WHERE customers.id = $1 GROUP BY restaurants.name, created_at, customer_id, orders.restaurant_id, orders.pickup_time
      ORDER BY created_at DESC;
 `;

      db.query(myOrdersQuery, values).then(data2 => {
        templateVars.orders = data2.rows;

        res.render("my_orders", templateVars);
      });
    });
  });

  router.post("/", (req, res) => {
    let created_at_date = parseInt(req.body.date);
    let resName = req.body.name;
    let pickup = parseInt(req.body.pickup);

    let ordersQuery = `
    SELECT oi quantity, i.name FROM items i
    JOIN orders_items oi on i.id = oi.item_id
    JOIN orders o  on oi.order_id = o.id
    JOIN restaurants r ON o.restaurant_id = r.id
    WHERE r.name = $1 AND o.created_at = $2 AND o.pickup_time = $3
    `;

    let ordersQueryValue = [resName, created_at_date, pickup];

    db.query(ordersQuery, ordersQueryValue)
      .then(data => {

        let result = [];
        for (let item in data.rows) {

          let quantity = data.rows[item]["quantity"].split(",");

          data.rows[item]["quantity"] = (data.rows[item]["quantity"].split(","),
          quantity[quantity.length - 1]).slice(0, -1);

          result.push(data.rows[item]);
        }
        res.send(JSON.stringify(result));
      })
      .catch(err => console.log(err));
  });

  return router;
};
