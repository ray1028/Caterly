const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    res.render("login", { error: false });
  });

  router.post("/", async(req, res) => {
    //DO SOMETHING WITH DATA
    let userId = "";
    const email = req.body.email;
    const password = req.body.password;

    let queryStr = "select * from customers where email = $1 and password = $2";
    let values = [email, password];

    try {
      const customer = await db.query(queryStr, values);
      // found user in db
      if (customer.rowCount !== 1) throw new Error('customer not found')
      else {
        req.session.user_id = customer.rows[0].id;
        res.redirect('/home');
      }
    } catch (err) {
      console.log(`Error - ${err}`);
    }

  });

  return router;
};
