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

  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  return router;
};
