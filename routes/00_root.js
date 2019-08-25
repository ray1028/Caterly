const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    //HARDCODED USERNAME FOR TESTING
    res.render("index", {user: undefined});
  });

  return router;
};
