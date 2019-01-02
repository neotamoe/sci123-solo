// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');

// GET questions selected by chapter
router.get('/', function(req, res) {
    // query to get 5 random questions from selected chapter for quiz
    questionsModel.aggregate([{$sample:{size:1}}], function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        res.send(data);
      }
    });
});