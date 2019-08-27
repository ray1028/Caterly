const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post('/', (req, res) => {
    req.session = null;
    res.clearCookie('cart');
    res.status(302).redirect("/");
  })

  return router;
}
