const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    res.render("login", { error: false });
  });

  router.post("/", async (req, res) => {
    //DO SOMETHING WITH DATA
    let userId = "";
    const email = req.body.mail;
    const password = req.body.password;

    let queryStr = "select * from customers where email = $1 and password = $2";
    let values = [email, password];

    try {
      const customer = await db.query(queryStr, values);
      // found user in db
      if (customer.rowCount === 1) res.redirect("/home");
      else {
        // res.redirect('/login', {error: true});
      }
    } catch (err) {
      console.log(`Error - ${err}`);
    }

    res.redirect(303, "/home");
  });

  return router;
};
