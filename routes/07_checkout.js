const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendMSG = function(phone) {
  client.messages
    .create({
      body: "Your order has been received",
      from: "+16476948610",
      to: phone
    })
    .then(message => console.log(message.sid));
};

module.exports = db => {
  router.get("/", (req, res) => {
    res.render("checkout");
  });

  router.post("/", async (req, res) => {
    const date = new Date();
    const dm = date.getTime();
    let orderObj = JSON.parse(req.body.items);

    for (let item of orderObj) {
      await db
        .query(
          "insert into orders (customer_id, restaurant_id, created_at, pickup_time, order_total) values ($1, $2, $3, $4, $5) returning *",
          [

            req.session.user_id,
            item.restoId,
            dm,
            0,
            (item.quantity * Number(item.price)).toFixed(2) * 1000
          ]
        )
        .then(async data => {
          if (data.rowCount !== 1) {
            throw new Error("Insertion error on orders");
          } else {
            await db
              .query(
                "insert into orders_items(order_id, item_id, quantity) values ($1, $2, $3)",
                [data.rows[0].id, item.id, Number(item.quantity)]
              )
              .then(async odata => {
                if (odata.rowCount !== 1) {
                  throw new Error("Insertion error on orders items");
                } else {
                  await db
                    .query(`SELECT * FROM restaurants WHERE id = $1`, [
                      item.restoId
                    ])
                    .then(restaurant => {
                      console.log("success");
                      console.log(restaurant.rows[0].phone);
                      res.redirect(301,'/home');
                      sendMSG(restaurant.rows[0].phone);
                    });
                }
              });
          }
        })
        .catch(err => console.log(err));
    }
  });

  //AJAX HERE

  return router;
};
