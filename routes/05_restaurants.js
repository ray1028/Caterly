const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    let templateVars = {};
    if (!req.query.search) {
      res.render("/home");
    } else {
      const values = [req.query.search];
      db.query("select * from restaurants where lower(name) like $1", values)
        .then(dataRes => {
          if (dataRes.rowCount === 0) {
            res.status(302).redirect('/home');
            throw new Error("Restaurants not found");
          } else {
            templateVars.restaurant = dataRes.rows[0];
            db.query("select * from items where restaurant_id = $1", [dataRes.rows[0].id])
              .then(itemsData => {
                if(itemsData.rowCount < 1){
                  res.status(302).redirect('/home');
                  throw new Error('menu item not found');
                } else {
                  templateVars.items = itemsData.rows;
                  res.status(200).render("restaurants", templateVars);
                }
              }).catch(err => console.log(`Error occurs finding items - ${err}`))
            // res.render("restaurants", templateVars);
          }
        })
        .catch(err => console.log(`Error - ${err}`));
    }
  });
  return router;
};
