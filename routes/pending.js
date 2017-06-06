var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

router.get('/', function(req, res) {
  console.log(' in get route for pending questions');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.find({display:'false'}).then(function(data){
      console.log('data for pending questions-->', data);
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
