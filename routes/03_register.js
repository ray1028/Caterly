const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("register");
  });

  router.post("/", (req, res) => {
    //DO SOMETHING WITH DATA

    res.redirect(303, '/home');
  });

  return router;
};
