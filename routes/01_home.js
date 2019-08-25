const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", async (req, res) => {
    // if user not logged in and access home page. Redirect to login page
    if (!req.session.user_id) {
      res.redirect("/login");
    }
    let queryStrCustomer = "select * from customers where id = $1";
    let queryStrCategories = "select * from categories";
    let values = [req.session.user_id];

    try {
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

  router.post("/", (req, res) => {
  });
  return router;
};
