const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const strftime = require("strftime");

const formatDate = function(epoch) {
  return strftime("%F %T", new Date(parseInt(epoch)));
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

    // SELECT categories.name as name, categories.thumbnail_image as thumbnail_image, count(restaurants) FROM categories JOIN restaurants ON categories.id = category_id
    // GROUP BY categories.name, categories.thumbnail_image;

    // let values = req.session.user_id;
    let values = [1];

    try {
      // console.log(req, "req");

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

  //The get route for the login of the restaurant, this page will show all of the current and old orders
  router.get("/restaurants/:id", (req, res) => {
    const queryOrders = `SELECT restaurant_id, pickup_time , restaurants.name as name, order_total , customers.first_name as customers_name, created_at FROM restaurants JOIN orders on restaurants.id = restaurant_id 
    JOIN customers on customers.id = customer_id WHERE
    restaurant_id = $1`;

    const queryOrdersValue = [`${req.params.id}`];

    db.query(queryOrders, queryOrdersValue).then(data => {
      if (data.rowCount === 0) {
        res.send("error");
        console.log("DNE");
      } else {
        const templateVars = { orders: data.rows, formatDate: formatDate };
        res.render(`restaurants_home`, templateVars);
      }
    });
  });

  //POST route to update the confirm time and send back a text message to the client
  router.post("/restaurants/:id", (req, res) => {
    let updateQuery = `    UPDATE orders SET pickup_time = $1 WHERE orders.id = $2;`;
    let updateQueryValue = [
      Date.now() + req.body.time * 60000,
      req.params.id
    ];

    db.query(updateQuery, updateQueryValue);
    let phoneQuery = `SELECT phone FROM customers JOIN orders ON customers.id = customer_id WHERE orders.id = $1;`;

console.log(req.params.id);

//home.js

    db.query(phoneQuery, [req.params.id]).then(data => {
      // sendMSG(textMSG(req.body.time), data.rows[0].phone);
    });


    res.redirect(`/home/restaurants/${req.params.id}`);
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

  return router;
};
