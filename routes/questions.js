// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

// GET questions selected by chapter
router.get('/:chapter', function(req, res) {
  var currentChapter = parseInt(req.params.chapter);
  // check if user is logged in & send back user object from database
  if(req.isAuthenticated()) {
    // query to get 5 random questions from selected chapter for quiz
    questionsModel.aggregate([{$match: {display:'true', chapter:currentChapter}},{$sample:{size:5}}], function(err, data){
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

// GET 1 random question (for use in chrome extension)
// http://sci123.herokuapp.com/#/quiz/extension
router.get('/extension', function(req, res) {
  // query to get 1 random question for quiz
  questionsModel.aggregate([{$sample: { size: 1 }}], function(err, data){
    if (err) {
      console.log('Database Error: ', err);
      res.sendStatus(500);
    } else{
      console.log(data);
      res.send(data);
    }
  });

});

// GET tags from database to display
router.get('/', function(req, res) {
  // check if user is logged in & send back user object from database
  if(req.isAuthenticated()) {
    // query to get all distinct tags from database
    questionsModel.distinct('tags').sort().then(function(data) {
      res.send(data);
    });
  } else {
    // redirect to /home if not logged in
    $location.path("/home");
    res.sendStatus(403);
  }
});

module.exports = router;

// note about mongoimport of csv file with initial data:
// tags in csv file are imported as strings.
// use terminal to access mongo and run the following function to split tags into array after import from csv.
// db.questions.find().snapshot().forEach(function(x){x.tags=x.tags.split(', ');db.questions.save(x);});
