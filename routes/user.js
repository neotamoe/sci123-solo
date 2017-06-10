// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var UserModel = require('../models/user.model');

// GET user information and check if user is authenticated
router.get('/', function(req, res) {
  // check if user is logged in & send back user object from database
  if(req.isAuthenticated()) {
    res.send(req.user);
  } else {
    // redirect to /home if not logged in
    $location.path('/home');
    res.sendStatus(403);
  }
});

// GET to clear all server session information about current user
router.get('/logout', function(req, res) {
  // this is passport's built-in logout method
  req.logOut();
  res.sendStatus(200);
});

module.exports = router;
