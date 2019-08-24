const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    db.query(
      `SELECT * FROM restaurants JOIN categories ON category_id = categories.id WHERE categories.name = '${req.params.id}';`
    )
      .then(data => {
        if (data.rowCount === 0) {
          res.send("error");
          console.log("DNE");
        } else {
          const restaurants = data.rows;
          res.json({ restaurants });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
