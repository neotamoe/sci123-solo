// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var userModel = require('../models/user.model');

// GET to get stored user points
router.get('/', function(req, res) {
  console.log(' in get route for points: req', req.user.email);
  // check if logged in & send back user object from database
  if(req.isAuthenticated()) {
    // query to get user points from database
    userModel.find({email: req.user.email}, function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    });
  } else {
    // redirect to /home if not logged in
    $location.path('/home');
    res.sendStatus(403);
  }
});
// PUT to add points to user total
router.put('/', function(req, res) {
  // check if logged in & send back user object from database
  if(req.isAuthenticated()) {
    // query to update user points in database
    userModel.findOneAndUpdate({email:req.body.email},{points:req.body.points}, {new: true}, function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        res.send(data);
      }
    });
  } else {
    // redirect to /home if not logged in
    $location.path('/home');
    res.sendStatus(403);
  }
});

module.exports = router;
