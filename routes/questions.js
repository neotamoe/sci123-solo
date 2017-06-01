var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

// Handles Ajax request for user information if user is authenticated
router.get('/:chapter', function(req, res) {
  console.log(' in get route for chapter-->', req.params.chapter);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.aggregate([{$project: {display:true, chapter:req.params.chapter}},{$sample:{size:5}}]).then(function(data){
      console.log('data for chapter' + req.params.chapter+ '-->', data);
      res.send(data);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});


module.exports = router;
