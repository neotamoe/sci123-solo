var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

// working for single checkbox request
// router.get('/:selected', function(req, res) {
//   console.log(' in get route for selected-->', req.params.selected);
//   // check if logged in
//   if(req.isAuthenticated()) {
//     // send back user object from database
//     console.log('still logged in');
//     questionsModel.aggregate([{$match: {display:'true', tags:req.params.selected}},{$sample:{size:5}}]).then(function(data){
//       console.log('data for tags for '+req.params.selected+' -->', data);
//       res.send(data);
//     });
//   } else {
//     // failure best handled on the server. do redirect here.
//     console.log('not logged in');
//     res.sendStatus(403);
//   }
// });

router.get('/:selected/:selected2/:selected3', function(req, res) {
  console.log(' in get route for selected-->', req.params);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.aggregate([{$match: {display:'true', tags:{$in:[req.params.selected,req.params.selected2,req.params.selected3]}}},{$sample:{size:5}}]).then(function(data){
      console.log('data for tags for '+req.params.selected + req.params.selected2 + req.params.selected3 +' -->', data);
      res.send(data);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    res.sendStatus(403);
  }
});

module.exports = router;
