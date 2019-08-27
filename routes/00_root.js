const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    if(req.session.user_id) res.status(302).redirect('home');
    else res.render("index", {user: undefined});
  });

  return router;
};
