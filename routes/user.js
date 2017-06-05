var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var userModel = require('../models/user.model');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
    console.log(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    res.sendStatus(403);
  }
});

// router.get('/points', function(req, res) {
//   console.log(' in get route for points');
//   // check if logged in
//   if(req.isAuthenticated()) {
//     // send back user object from database
//     console.log('still logged in');
//     userModel.find({email: req.query.email}).then(function(data){
//       console.log('data for points query-->', data);
//       res.send(data);
//     });
//   } else {
//     // failure best handled on the server. do redirect here.
//     console.log('not logged in');
//     res.sendStatus(403);
//   }
// });


// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
