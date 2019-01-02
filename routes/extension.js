// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

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