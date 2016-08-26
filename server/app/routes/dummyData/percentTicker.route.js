'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/', function (req, res) {
  let now = new Date();
  let offset = (now / 1000) % 50

  let data = {
        slow: Math.abs(Math.sin(Math.PI * offset / 50) * 100.0),
        fast: Math.abs(Math.sin(Math.PI * offset / 20) * 100.0)
    }

  res.send(data);
});

