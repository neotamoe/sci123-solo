var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

router.get('/:selected/:selected2/:selected3', function(req, res) {
  console.log(' in get route for selected-->', req.params);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.aggregate([{$match: {display:'true', tags:{$in:[req.params.selected,req.params.selected2,req.params.selected3]}}},{$sample:{size:5}}], function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        console.log('data for tags for '+req.params.selected + req.params.selected2 + req.params.selected3 +' -->', data);
        res.send(data);
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path('/home');
    res.sendStatus(403);
  }
});

module.exports = router;
