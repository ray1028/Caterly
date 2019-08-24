const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("home");
  });

  router.post("/", (req, res) => {
    //PLACEHOLDER BELOW
  });
  return router;
};
