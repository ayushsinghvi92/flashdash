'use strict';
var router = require('express').Router();
const db = require('../../../db');
const Dashboard = db.model('dashboard');
const User = db.model('user');
const AuthFactory = require("../../configure/authentication/auth-factory")
module.exports = router;

let ensureAuthenticated = AuthFactory.ensureAuthenticated;
let ensureRightUser = AuthFactory.ensureRightUser;  // Requires :userId property

//User's Routes
router.get('/:userId/dashboards', ensureAuthenticated, ensureRightUser, function (req, res, next) {
   Dashboard.findAll(
    {where: {userId: req.params.userId},
    order : 'id ASC'})
   .then(function(boards) {
    res.send(boards);
   })
   .catch(next);
});

router.put('/:userId', ensureAuthenticated, ensureRightUser, function(req, res, next){
  User.findById(req.params.userId)
  .then(function(user){
    return user.update(req.body);
  })
  .then(()=> res.send(200))
  .catch(function(){
    next();
  });
})

router.post('/signup', function(req, res, next){
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(function (existingUser) {
    if(existingUser) {
      res.sendStatus(403);
      throw new Error ('Email Id has already been registered')
    }
    else {
      return User.create(req.body)
    }
  })
  .then(() => res.send(200))
  .catch(next)
})

router.delete('/:userId', ensureAuthenticated, ensureRightUser, function(req, res, next){
  User.findById(req.params.userId)
  .then(function(user){
    return user.destroy();
  })
  .then(function(){
    return req.session.destroy();
  })
  .then(()=> res.send(200))
  .catch(next);
})

//User's Dashboard Routes
router.post('/:userId/dashboard', ensureAuthenticated, ensureRightUser, function(req, res, next){
  Dashboard.create({
      userId: req.params.userId,
      name: req.body.name,
      description: req.body.description
  })
  .then(()=> res.send(200))
      .catch(function(err) {
        if (err.name && err.name.match("[uU]nique")) {
          res.status(409).send("Duplicate dashbard name: " + req.body.name || "unknown");
        } else {
          next();
        }
      })
});

router.put('/:id/dashboard/:dashboardId', ensureAuthenticated, function(req, res, next){
  Dashboard.findById(req.params.dashboardId)
  .then(function(dashboard) {
    if (dashboard && dashboard.userId && (dashboard.userId !== req.user.id)) {
        res.status(401).send("Can't access data for that user");
    } else {
      return dashboard.update(req.body)
      .then(()=> res.send(200))
      .catch(function(err) {
        if (err.name && err.name.match("[uU]nique")) {
          res.status(409).send("Duplicate dashboard name: " + req.body.name || "unknown");
        } else {
          next();
        }
      })
    }
  })
  .catch(next)
})

router.delete('/:id/dashboard/:dashboardId', ensureAuthenticated, function(req, res, next){
  Dashboard.findById(req.params.dashboardId)
  .then(function(dashboard) {
    if (dashboard && dashboard.userId && (dashboard.userId !== req.user.id)) {
        res.status(401).send(AuthFactory.wrongUserMessage);
    } else {
      return dashboard.destroy()
      .then(()=> res.send(200))
    }
  })
  .catch(next)
})

