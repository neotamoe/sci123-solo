var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var userModel = require('../models/user.model');

router.get('/', function(req, res) {
  console.log(' in get route for points: req', req.user.email);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    userModel.find({email: req.user.email}).then(function(data){
      console.log('data for points query-->', data);
      res.send(data);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

router.post('/', function(req, res) {
  console.log(' in get route for points.  req.body--> ', req.body);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    userModel.findOneAndUpdate({email:req.body.email},{points:req.body.points}).then(function(data){
      console.log('data for points post-->', data);
      res.send(data);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

module.exports = router;
