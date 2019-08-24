const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.get("/", (req, res) => {
    //sql query to assign template vars with data
    //PLACEHOLDER BELOW
    const templateVars = res;

    res.render("cart", templateVars);
  });

  return router;
};
