'use strict';
var router = require('express').Router();
module.exports = router;

// Yahoo Stocks dummy data

router.get('/', function (req, res, next) {
  let now = new Date();
  let data = {
    when: now % 1000000,
    fast: Math.sin(Math.PI * (now % 20000) / 50000),
    slow: Math.sin(Math.PI * (now % 100000) / 50000),
  }

  res.send(data);
});

