const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const strftime = require("strftime");

const formatDate = function(epoch) {
  return strftime("%b %D %I:%M%p", new Date(parseInt(epoch)));
};

module.exports = db => {
  router.get("/", async (req, res) => {
    // if user not logged in and access home page. Redirect to login page
    // if (!req.session.user_id) {
    //   res.redirect("/login");
    // }
    let queryStrCustomer = "SELECT * FROM customers WHERE id = $1";
    let queryStrCategories =
      "SELECT categories.name as name, categories.thumbnail_image as thumbnail_image, count(restaurants) as count FROM categories JOIN restaurants ON categories.id = category_id GROUP BY categories.name, categories.thumbnail_image";

    try {
      let values = [req.session.user_id];
      const userRes = await db.query(queryStrCustomer, values);
      const categoriesRes = await db.query(queryStrCategories);
      const restaurantRes = await db.query("select name from restaurants");

      if (userRes.rowCount !== 1) res.redirect("/");
      if (categoriesRes.rowCount < 1) throw new Error("Categories not found");
      if (restaurantRes.rowCount < 1) throw new Error("Restaurant not found");

      // array holds restaurant autocomplete search list
      const restaurantNameArr = [];
      restaurantRes.rows.forEach(restaurant =>
        restaurantNameArr.push(restaurant.name)
      );

      res.render("home", {
        user: userRes.rows[0].first_name,
        categories: categoriesRes.rows,
        restaurantsData: restaurantNameArr
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //The get route for the login of the restaurant, this page will show all of the current and old orders
  router.get("/restaurants/:id", (req, res) => {
    let templateVars = {};

    const queryStrHeader = `
    SELECT name FROM restaurants
      WHERE id = $1
    `;
    const values = [req.session.user_id];

    db.query(queryStrHeader, values).then(data => {
      templateVars.user = `${data.rows[0].name}`;

      const queryOrders = `SELECT restaurant_id, pickup_time , restaurants.name as name, sum(order_total) as order_total, customers.first_name as customers_name, created_at
      FROM restaurants
      JOIN orders ON restaurants.id = restaurant_id
      JOIN customers ON customers.id = customer_id
      WHERE
      restaurant_id = $1 GROUP BY created_at, orders.restaurant_id, orders.pickup_time, restaurants.name, customers.first_name ORDER BY created_at DESC;
  `;

      const queryOrdersValue = [req.params.id];

      db.query(queryOrders, queryOrdersValue).then(data => {
        if (data.rowCount === 0) {
          res.send("error");
          console.log("DNE");
        } else {
          templateVars.orders = data.rows;
          templateVars.formatDate = formatDate;
          res.render(`restaurants_home`, templateVars);
        }
      });
    });
  });

  //POST route to update the confirm time and send back a text message to the client
  router.post("/restaurants/:id", (req, res) => {
    console.log(req.body);
    if (req.body.key === "update") {
      let updateQueryValue = [
        Date.now() + req.body.time * 60000,
        req.params.id
      ];

      let updateQuery = ` UPDATE orders SET pickup_time = $1 FROM restaurants WHERE restaurants.id = restaurant_id AND restaurants.id = $2 AND pickup_time = 0 AND created_at = ${req.body.currentTime};`;

      let phoneQuery = `SELECT customers.phone FROM customers JOIN orders ON customers.id = customer_id
    JOIN restaurants ON restaurants.id = restaurant_id WHERE restaurants.id = $1 AND pickup_time = 0 AND created_at = ${req.body.currentTime};`;

      db.query(phoneQuery, [req.params.id]).then(data => {
        sendMSG(textMSG(req.body.time), data.rows[0].phone);

        db.query(updateQuery, updateQueryValue);
      });
      res.redirect(`/home/restaurants/${req.params.id}`);
    } else if (req.body.key === "orderinfo") {
      let created_at_date = parseInt(req.body.date);
      let cusName = req.body.name;

      let ordersQuery = `select oi.quantity, i.name from items i
   join orders_items oi on i.id = oi.item_id
   join orders o on oi.order_id = o.id
   join customers c on o.customer_id = c.id
   where c.first_name = $1 and o.created_at = $2`;
      let ordersQueryValue = [cusName, created_at_date];

      db.query(ordersQuery, ordersQueryValue)
        .then(data => {
          let result = [];
          for (let item in data.rows) {
            result.push(data.rows[item]);
          }
          res.send(JSON.stringify(result));
        })
        .catch(err => console.log(err));
    }
  });

  //Helper functions
  const textMSG = function(time) {
    return `You will recieve your order in ${time} minutes`;
  };

  const sendMSG = function(content, phone) {
    client.messages
      .create({ body: content, from: "+16476948610", to: phone })
      .then(message => console.log(message.sid));
  };

  router.get("/", async (req, res) => {
    // if user not logged in and access home page. Redirect to login page
    if (!req.session.user_id) {
      res.redirect("/login");
    }
    let queryStrCustomer = "SELECT * FROM customers WHERE id = $1";
    let queryStrCategories =
      "SELECT categories.name as name, categories.thumbnail_image as thumbnail_image, count(restaurants) as count FROM categories JOIN restaurants ON categories.id = category_id GROUP BY categories.name, categories.thumbnail_image";

    try {
      let values = [req.session.user_id];
      const userRes = await db.query(queryStrCustomer, values);
      const categoriesRes = await db.query(queryStrCategories);

      if (userRes.rowCount !== 1) throw new Error("User is not found");
      if (categoriesRes.rowCount < 1) throw new Error("Categories not found");

      res.render("home", {
        user: userRes.rows[0].first_name,
        categories: categoriesRes.rows
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //Search route that displays the first restaurant LIKE the query
  router.post("/", (req, res) => {
    const queryRestaurantID = `
    SELECT id FROM restaurants WHERE lower(name) LIKE lower($1) LIMIT 1`;

    const restaurantName = [`%${req.body.search}%`];

    db.query(queryRestaurantID, restaurantName).then(data => {
      if (data.rowCount === 0) {
        res.send("error");
        console.log("DNE");
      } else {
        res.redirect(`/restaurants/${data.rows[0].id}`);
      }
    });
  });

  return router;
};
