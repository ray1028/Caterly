const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("checkout");
  });

  router.post("/", async (req, res) => {
    const date = new Date();
    const dm = date.getTime()
    let orderObj = JSON.parse(req.body.items);

    for(let item of orderObj){
     await db.query('insert into orders (customer_id, restaurant_id, created_at, pickup_time, order_total) values ($1, $2, $3, $4, $5) returning *',[
      req.session.user_id, item.restoId, dm, 0, (item.quantity * Number(item.price)).toFixed(2) * 1000]).then(async data => {
        if(data.rowCount !== 1){
          throw new Error('Insertion error on orders');
        } else {
          await db.query('insert into orders_items(order_id, item_id, quantity) values ($1, $2, $3)',[
            data.rows[0].id, item.id, Number(item.quantity)
          ]).then(
            odata => {
              if(odata.rowCount !==  1){
                throw new Error('Insertion error on orders items');
              } else {
                console.log('successful');
                res.redirect('/home');
              }
            }
          )
        }
      }).catch(err => console.log(err));
    }

  });

  //AJAX HERE

  return router;
};
