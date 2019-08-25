const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    //HARDCODED USERNAME FOR TESTING
    const templateVars = {
      username: undefined
    };

    res.render("index", templateVars);
  });

  return router;
};
