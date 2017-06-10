// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

// GET questions selected by tag/keyword
router.get('/:selected/:selected2/:selected3', function(req, res) {
  // check if logged in & send back user object from database
  if(req.isAuthenticated()) {
    // query to get selected tags for quiz
    questionsModel.aggregate([{$match: {display:'true', tags:{$in:[req.params.selected,req.params.selected2,req.params.selected3]}}},{$sample:{size:5}}], function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    });
  } else {
    // redirect to /home if not logged in
    console.log('not logged in');
    $location.path('/home');
    res.sendStatus(403);
  }
});  // end GET selected tags

module.exports = router;
