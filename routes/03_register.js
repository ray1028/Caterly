const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    // const templateVars = {
    //   user: undefined
    // };
    res.render("register");
  });

  router.post("/", async (req, res) => {
    const insertValues = [req.body.fname, req.body.lname, req.body.email, req.body.phonenumber, req.body.password, '123,123'];
    // const queryStr = 'select * from customers where email = $1';
    const insertStr = 'insert into customers (first_name, last_name, email, phone, password, current_location) values ($1, $2, $3, $4, $5, $6) returning *'
    try{
      // const customerRes = await db.query(queryStr,[req.body.email]);
      // if(customerRes.rowCount !== 1){
        const newCustomerRes = await db.query(insertStr, insertValues);
        if(newCustomerRes.rowCount === 1){
          req.session.user_id =  newCustomerRes.rows[0].id;
          res.redirect('/home');
        }
      // }
    } catch(err){
      console.log(`Error - ${err}`);
    }
  });

  return router;
};
