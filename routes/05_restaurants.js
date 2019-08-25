const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    let values = [`'%${req.params.id}%`];
    db.query(`SELECT * FROM restaurants WHERE name LIKE $1`, values)
      .then(data => {
        const templateVars = {
          restaurants: data.rows
        };

        if (res.rowCount === 0) {
          console.log("DNE");
        } else {
          res.json(templateVars);
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
