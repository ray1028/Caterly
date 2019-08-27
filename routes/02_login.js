const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/restaurant", (req, res) => {
    const templateVars = {
      error: false,
      user: undefined
    };
    res.render("login-restaurant", templateVars);
  });

  router.post("/restaurant", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let queryStr =
      "select * from restaurants where email = $1 and password = $2 LIMIT 1";
    let values = [email, password];

    try {
      const restaurant = await db.query(queryStr, values);
      // found restaurant in db

      if (restaurant.rowCount !== 1) throw new Error("Restaurant not found");
      else {
        req.session.user_id = restaurant.rows[0].id;

        res.status(302).redirect(`/home/restaurants/${restaurant.rows[0].id}`);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/", (req, res) => {
    const templateVars = {
      error: false,
      user: undefined
    };
    res.render("login", templateVars);
  });

  router.post("/", async (req, res) => {
    //DO SOMETHING WITH DATA
    let userId = "";
    const email = req.body.email;
    const password = req.body.password;

    let queryStr = "select * from customers where email = $1 and password = $2";
    let values = [email, password];

    try {
      const customer = await db.query(queryStr, values);
      // found user in db
      if (customer.rowCount !== 1) throw new Error("customer not found");
      else {
        req.session.user_id = customer.rows[0].id;
        // res.cookie('cart', {user_id: customer.rows[0].id} ,{
        //   httpOnly: false,
        //   encode: String
        // });
        res.status(302).redirect("/home");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
