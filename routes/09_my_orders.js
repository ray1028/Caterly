const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    const templateVars = {};
    const queryStrHeader = `
    SELECT first_name, last_name FROM customers
      WHERE id = $1
    `;
    const values = [req.session.user_id]
    
    db.query(queryStrHeader, values)
      .then(data => {
        templateVars.user = `${data.rows[0].first_name}`;
      res.render("my_orders", templateVars);
    });
  });
  return router;
};
