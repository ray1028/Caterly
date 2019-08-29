const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", (req, res) => {
    let templateVars = {};
    let queryStrCustomer = "SELECT * FROM customers WHERE id = $1";
    let values = [req.session.user_id];
    db.query(queryStrCustomer, values)
      .then(data => {
        if (data.rowCount === 1) {
          templateVars.user = data.rows[0].first_name;
        }
      })
      .catch(err => res.send.json(err));


    //
    if (!req.params.id) {
      res.status(302).redirect("/home");
    } else {
      const values = [req.params.id];
      db.query("select * from restaurants where id = $1", values)
        .then(dataRes => {
          if (dataRes.rowCount === 0) {
            res.status(302).redirect("/home");
            throw new Error("Restaurants not found");
          } else {
            templateVars.restaurant = dataRes.rows[0];
            db.query("select * from items where restaurant_id = $1", [
              dataRes.rows[0].id
            ])
              .then(itemsData => {
                if (itemsData.rowCount < 1) {
                  res.status(302).redirect("/home");
                  throw new Error("menu item not found");
                } else {
                  templateVars.items = itemsData.rows;
                    res.status(200).render("restaurants", templateVars);
                }
              })
              .catch(err => console.log(`Error occurs finding items - ${err}`));
          }
        })
        .catch(err => console.log(`Error - ${err}`));
    }
  });
  return router;
};
