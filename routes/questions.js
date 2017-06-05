var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

// Handles Ajax request for user information if user is authenticated
router.get('/:chapter', function(req, res) {
  console.log(' in get route for chapter-->', req.params.chapter);
  var currentChapter = parseInt(req.params.chapter);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.aggregate([{$match: {display:'true', chapter:currentChapter}},{$sample:{size:10}}]).then(function(data){
      console.log('data for chapter' + currentChapter + '-->', data);
      res.send(data);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    res.sendStatus(403);
  }
});


router.get('/', function(req, res) {
  console.log(' in get route for tags');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.distinct('tags').sort().then( function(data) {
      console.log('data for tags-->', data);
      res.send(data);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    res.sendStatus(403);
  }
});


module.exports = router;

// must use terminal to access mongo and run the following function to split tags into array after import from csv
// db.questions.find().snapshot().forEach(function(x){x.tags=x.tags.split(', ');db.questions.save(x);});
