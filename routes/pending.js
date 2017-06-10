// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

// GET questions pending for review 
router.get('/', function(req, res) {
  // check if logged in, if admin status and if both true, send back user object from database
  if(req.isAuthenticated() && req.user.admin===true) {
    // query to get questions from database with {display: 'false'}
    questionsModel.find({display:'false'}, function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        res.send(data);
      }
    });
  } else {
    // redirect to /home if not logged in
    console.log('not logged in');
    $location.path('/home');
    res.sendStatus(403);
  }
});

// PUT to update questions after review by admin
router.put('/:id', function(req, res) {
  var objectid=req.params.id;
  // check if logged in, if admin status and if both true, send back user object from database
  if(req.isAuthenticated() && req.user.admin===true) {
    // query to update approved questions in database with {display: 'true'}
    questionsModel.findOneAndUpdate({_id:objectid},{display:'true'}, function(err){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    // redirect to /home if not logged in
    console.log('not logged in');
    $location.path('/home');
    res.sendStatus(403);
  }
});

// DELETE to remove question after review by admin
router.delete('/:id', function(req, res) {
  var objectid=req.params.id;
  // check if logged in, if admin status and if both true, send back user object from database
  if(req.isAuthenticated() && req.user.admin===true) {
    // query to delete denied question from database
    questionsModel.findOneAndRemove({_id:objectid},function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        res.send('"'+objectid+'" deleted');
      }
    });
  } else {
    // redirect to /home if not logged in
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

// POST to save question after review by admin
router.put('/', function(req, res) {
  // check if logged in, if admin status and if both true, send back user object from database
  if(req.isAuthenticated() && req.user.admin===true) {
    // query to update question based on content edited by admin
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
    // redirect to /home if not logged in
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

module.exports = router;
