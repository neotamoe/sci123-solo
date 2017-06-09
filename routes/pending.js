var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

router.get('/', function(req, res) {
  console.log(' in get route for pending questions');
  // check if logged in
  console.log('in get pending route: req.user: ', req.user);
  if(req.isAuthenticated() && req.user.admin===true) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.find({display:'false'}, function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        console.log('data for pending questions-->', data);
        res.send(data);
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

router.put('/:id', function(req, res) {
  console.log(' in post route to approve pending questions: req.params.id-->', req.params.id);
  var objectid=req.params.id;
  // check if logged in
  console.log('in put route: req.user', req.user);
  if(req.isAuthenticated() && req.user.admin===true) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.findOneAndUpdate({_id:objectid},{display:'true'}, function(err){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});


router.delete('/:id', function(req, res) {
  console.log(' in post route to approve pending questions: req.params.id-->', req.params.id);
  var objectid=req.params.id;
  // check if logged in
  if(req.isAuthenticated() && req.user.admin===true) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.findOneAndRemove({_id:objectid},function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        res.send('"'+objectid+'" deleted');
      }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

router.post('/', function(req, res) {
  console.log(' in post route to save pending questions: req.body-->', req.body);
  // check if logged in
  if(req.isAuthenticated() && req.user.admin===true) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.update({_id:req.body._id},{
      chapter:req.body.chapter,
      source: req.body.source,
      question:req.body.question,
      page:req.body.page,
      a:req.body.a,
      b:req.body.b,
      c:req.body.c,
      d:req.body.d,
      answer:req.body.answer,
      tags:req.body.tags,
      display:'false'}, function(err){
        if (err) {
          console.log('Database Error: ', err);
          res.sendStatus(500);
        } else{
          res.sendStatus(200);
        }
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

module.exports = router;
