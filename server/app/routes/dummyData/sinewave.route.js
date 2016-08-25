'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/', function (req, res) {
  let now = new Date();
  let offset = (now / 1000) % 50

  let data = [];
  for (let i = 0; i <= 100; i++) {
    data.push({
        when: i,
        slow: Math.sin(Math.PI * (i + offset) / 50),
        fast: Math.sin(Math.PI * (i + offset) / 20)
    })
  }

  res.send(data);
});

