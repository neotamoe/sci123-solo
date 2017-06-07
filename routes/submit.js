var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

router.post('/', function(req, res) {
  console.log(' in post route to studentSubmit a question: req.body-->', req.body);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    // questionsModel.insert({req.body}).then(function(){
      res.sendStatus('hip hip hooray');
    // });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});


module.exports = router;
