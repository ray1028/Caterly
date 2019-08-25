const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    db.query(`SELECT * FROM restaurants WHERE name LIKE '%${req.params.id}%';`)
      .then(data => {
        const templateVars = {
          restaurants: data.rows
        };

        if (res.rowCount === 0) {
          console.log("DNE");
        } else {
          res.render("restaurants", templateVars);
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
