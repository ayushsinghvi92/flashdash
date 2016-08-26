'use strict';
var router = require('express').Router();
//const AuthFactory = require("../../configure/authentication/auth-factory")

module.exports = router;

// Authenticate all requests down this route.  Remove to open the route.
// router.get('/', AuthFactory.ensureAuthenticated, function (req, res, next) {
//  next();
// })

// Farm requests out to the individual dummy data files
router.use('/yhStocks', require('./yhStocks.route'));
router.use('/gitMosane', require('./gitMosane.route'));
router.use('/guardianFootball', require('./guardianFootball.route'));
router.use('/nflPlayers', require('./nflPlayers.route'));
router.use('/weather', require('./weather.route'));
router.use('/sinewave', require('./sinewave.route'));
router.use('/percentTicker', require('./percentTicker.route'));


