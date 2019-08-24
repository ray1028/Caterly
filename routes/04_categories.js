const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    //sql query to assign template vars with data
    //PLACEHOLDER BELOW
    const templateVars = res;

    res.render("categories", templateVars);
  });

  return router;
};
